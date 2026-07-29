// Load files

// List of files to auto-discover in directories (add new files here)
const autoDiscoverFiles = {
    'data': ['HokmaGrid.js', 'FlavorText.js', 'NewsTicker.js', 'CraftingData.js'],
    'layers': ['Ktr.js', 'Hkm.js', 'Ain.js', 'Hbc.js']
};

// Build the complete file list
const allFiles = [];

// Add auto-discovered files from directories
for (const [dir, files] of Object.entries(autoDiscoverFiles)) {
    for (const file of files) {
        allFiles.push(dir + '/' + file);
    }
}

// Add other modFiles that aren't in auto-discover directories
const otherFiles = modInfo.modFiles.filter(f => {
    return !Object.keys(autoDiscoverFiles).some(dir => f.startsWith(dir + '/'));
});
allFiles.push(...otherFiles);

// Load all files in order
for (let i = 0; i < allFiles.length; i++) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + allFiles[i]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

