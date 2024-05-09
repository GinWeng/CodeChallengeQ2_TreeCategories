
function buildOptions(select, categories) {
  categories.forEach(category => {
    const optionGroup = document.createElement('optgroup');
    optionGroup.label = category.name;
    select.appendChild(optionGroup);
    if (category.children && category.children.length) {
      addChildren(optionGroup, category.children);
    }
  });
}

function addChildren(parent, children) {
  children.forEach(child => {
    const option = document.createElement('option');
    option.textContent = child.name;
    parent.appendChild(option);
    if (child.children && child.children.length) {
      addChildren(option, child.children);  // Recursively add children
    }
  });
}
