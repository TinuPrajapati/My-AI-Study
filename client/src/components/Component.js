function openDialog(set) {
    set(true)
    
  // Disable body scroll
  document.body.style.overflow = "hidden";
}

// Function to close the dialog
function closeDialog(set) {

    set(false)
  // Enable body scroll
  document.body.style.overflow = "auto";
}

export { openDialog, closeDialog };