// popup.js
// This script runs within the scope of the browser extension's popup window.

/**
 * Function designed to be injected into the active webpage.
 * It finds a button (expected to add sections) and clicks it multiple times.
 * IMPORTANT: The selector 'button[onclick="addSection()"]' might need adjustment
 * based on the actual HTML structure of the target webpage. A more stable
 * selector (like an ID or a unique class) is preferable if available.
 */
let numberOfClicks = 0; // How many times to click the button numberOfClicksToPerform
function addMultipleSections() {
  const addButtonSelector = 'button[onclick="addSection()"]'; // MODIFY THIS SELECTOR IF NEEDED

  const addButton = document.querySelector(addButtonSelector);

  if (addButton) {
    console.log(
      `Add Section button found using selector "${addButtonSelector}". Clicking ${numberOfClicks} times...`
    );
    let clicksPerformed = 0;
    for (let i = 0; i < numberOfClicks; i++) {
      try {
        addButton.click();
        clicksPerformed++;
        console.log(
          `Clicked Add Section button (${clicksPerformed}/${numberOfClicks})`
        );
        // Optional: Add a small delay between clicks if needed by the target page
        // await new Promise(resolve => setTimeout(resolve, 100)); // Requires the function to be async
      } catch (clickError) {
        console.error(
          `Error clicking Add Section button on iteration ${i + 1}:`,
          clickError
        );
        // Optionally break the loop if one click fails and subsequent clicks are pointless
        // break;
      }
    }
    console.log(
      `Finished attempting to click Add Section button. ${clicksPerformed} clicks were executed.`
    );
    // Optionally alert the user on the target page upon completion
    // alert(`Attempted to click the 'Add Section' button ${clicksPerformed} times.`);
  } else {
    // Provide feedback if the button isn't found on the target page
    const errorMessage = `The 'Add Section' button (matching selector "${addButtonSelector}") was not found on this page.`;
    console.error(errorMessage);
    alert(
      errorMessage +
        " Please ensure you are on the correct page and the selector is accurate."
    ); // User feedback on the target page
  }
}

// --- Wait for the popup's HTML (popup.html) to load before running scripts ---
document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup DOM fully loaded and parsed.");

  // --- Section 1: Review Generation Functionality ---
  const generateButton = document.getElementById("generateButton");
  const inputElement = document.getElementById("inputText");
  const outputElement = document.getElementById("output");

  if (generateButton && inputElement && outputElement) {
    console.log("Review generation elements found.");
    // Attach event listener to the generate button
    generateButton.addEventListener("click", generateReviews);
  } else {
    // Log an error if any essential element for review generation is missing
    console.error(
      "Error: Could not find one or more required elements for review generation."
    );
    if (!generateButton)
      console.error("Element with ID 'generateButton' is missing.");
    if (!inputElement) console.error("Element with ID 'inputText' is missing.");
    if (!outputElement) console.error("Element with ID 'output' is missing.");
    // Optionally disable the feature or show an error in the popup UI
    if (outputElement) {
      outputElement.innerHTML =
        "<p>⚠️ Error initializing popup elements. Cannot generate reviews.</p>";
    }
  }

  /**
   * Async function to fetch a generated review from the local server.
   * Triggered by clicking the 'generateButton'.
   */
  async function generateReviews() {
    console.log("generateReviews function called.");
    const inputTextValue = inputElement.value;
    outputElement.innerHTML = "<p>Generating reviews...</p>"; // Provide immediate feedback

    // Basic input validation
    if (!inputTextValue.trim()) {
      outputElement.innerHTML =
        "<p>⚠️ Please enter some text to generate a review.</p>";
      console.log("Review generation stopped: No input text provided.");
      return; // Stop execution if input is empty
    }

    console.log(
      "Sending request to generate review for:",
      inputTextValue.substring(0, 50) + "..."
    ); // Log partial input for privacy

    try {
      const response = await fetch("http://localhost:5000/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Explicitly accept JSON
        },
        body: JSON.stringify({ input: inputTextValue }), // Send the actual input text
      });

      console.log(`Server response status: ${response.status}`);

      // Check if the fetch was successful (status code 200-299)
      if (!response.ok) {
        let errorDetails = `Server returned status ${response.status}`;
        try {
          // Try to get more detailed error message from the server response body
          const errorText = await response.text();
          errorDetails += `. Response: ${errorText.substring(0, 200)}`; // Limit length
          console.error("Server error response text:", errorText);
        } catch (e) {
          console.error("Could not read error response text:", e);
          errorDetails += ". Could not read response body.";
        }
        // Throw an error to be caught by the catch block
        throw new Error(`HTTP error! ${errorDetails}`);
      }

      // Try to parse the response as JSON
      let data;
      let output;
      try {
        output = await response.json();
        numberOfClicks=output.count;
        data = JSON.stringify(output);
        console.log("Successfully parsed server JSON response:", data);
      } catch (jsonError) {
        console.error("Failed to parse server response as JSON:", jsonError);
        // Attempt to get raw text if JSON parsing fails
        const rawText = await response.text(); // Need to re-read or handle cloning if needed earlier
        outputElement.innerHTML = `<p>⚠️ Failed to parse server response. Server sent non-JSON data:</p><pre>${rawText.substring(
          0,
          500
        )}</pre>`;
        throw new Error("Server response was not valid JSON."); // Re-throw to be caught below
      }

      // Extract the review text, checking common possible keys in the JSON response
      const beautifiedText = data || data.review || data.text || data.generated_review;

      // if (typeof beautifiedText !== 'string' || !beautifiedText.trim()) {
      //   outputElement.innerHTML = `<p>⚠️ Received an unexpected or empty response format from the server.</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
      //   console.error('Unexpected server response format or empty content:', data);
      //   return;
      // }

      outputElement.innerHTML = ""; // Clear "Generating..." message

      // Display the generated review
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "review"; // Use the class from your popup's CSS
      reviewDiv.innerHTML = 
      `
      <h3>Generated Review</h3>
      <p>Count = ${beautifiedText.count}</p>
      ${beautifiedText.pairs}
      `; // Replace newlines with <br> for HTML display
      outputElement.appendChild(reviewDiv);
      console.log("Review successfully displayed.");
    } catch (error) {
      console.error("Error during review generation or fetch:", error);

      // Provide user-friendly error feedback in the popup
      let errorMessage = `⚠️ Failed to generate review. ${error.message || ""}`;
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        // Network error (server down, CORS, etc.)
        errorMessage =
          "⚠️ Failed to generate review. Could not connect to the server (http://localhost:5000). Is it running? Check console & network logs for CORS issues.";
      } else if (error.message.includes("HTTP error")) {
        // Handled HTTP status errors from above
        errorMessage = `⚠️ Failed to generate review. ${error.message}`;
      } else if (error.message.includes("JSON")) {
        // Handled JSON parsing errors from above
        errorMessage = `⚠️ Failed to generate review. ${error.message}`;
      } else {
        // Other unexpected errors
        errorMessage = `⚠️ An unexpected error occurred: ${error.message}. Check the extension console.`;
      }
      outputElement.innerHTML = `<p style="color: red;">${errorMessage}</p>`; // Display error prominently
    }
  }

  // --- Section 2: Add Sections Button Functionality ---
  const addSectionsButton = document.getElementById("add-sections-button");

  if (addSectionsButton) {
    console.log("Add Sections button element found.");
    addSectionsButton.addEventListener("click", function () {
      console.log("'Add Sections' button clicked in popup.");
      // Find the currently active tab in the current window
      // const desiredClicks=data;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Check if any active tab was found
        if (!tabs || tabs.length === 0) {
          console.error("No active tab found.");
          alert(
            "Error: Could not find an active tab to inject the script into."
          ); // User feedback in popup
          return;
        }
        const activeTab = tabs[0];

        // Check if the tab has a valid ID (necessary for targeting)
        if (!activeTab.id) {
          console.error("Active tab is missing an ID:", activeTab);
          alert(
            "Error: The active tab does not have an ID, cannot execute script."
          ); // User feedback in popup
          return;
        }

        // Prevent injection into restricted URLs (like chrome:// pages)
        if (
          activeTab.url?.startsWith("chrome://") ||
          activeTab.url?.startsWith("edge://") ||
          activeTab.url?.startsWith("about:")
        ) {
          console.warn(
            `Attempted to inject script into restricted URL: ${activeTab.url}`
          );
          alert(
            `Cannot run script on this type of page (${activeTab.url}). Please navigate to a standard webpage.`
          );
          return;
        }

        console.log(
          `Attempting to inject 'addMultipleSections' script into tab ID: ${activeTab.id}, URL: ${activeTab.url}`
        );
        // Inject the addMultipleSections function (defined outside DOMContentLoaded) into the active tab
        chrome.scripting
          .executeScript({
            target: { tabId: activeTab.id },
            function: addMultipleSections, // Pass the function definition
          })
          .then((results) => {
            // Check results from the content script if needed
            console.log(
              "Script 'addMultipleSections' injected successfully into tab:",
              activeTab.id,
              "Results:",
              results
            );
            // You could optionally provide feedback in the popup here, but feedback within the injected script (console.log/alert) is often more direct.
          })
          .catch((injectionError) => {
            console.error(
              "Failed to inject script into tab:",
              activeTab.id,
              injectionError
            );
            alert(
              `Failed to execute script on the page. Error: ${injectionError.message}. \n\nCommon causes:\n- Extension lacks permissions for this site.\n- The page is restricted (e.g., chrome:// pages).\n- Check the console on both the popup and the target page for more details.`
            ); // User feedback in popup
          });
      });
    });
  } else {
    // Log an error if the 'Add Sections' button is missing
    console.error(
      "Error: Button with ID 'add-sections-button' not found in popup.html."
    );
    // Optionally disable the feature or show an error in the popup UI
  }
}); // --- End of DOMContentLoaded listener ---

console.log("popup.js script loaded."); // Log to confirm script itself loaded
