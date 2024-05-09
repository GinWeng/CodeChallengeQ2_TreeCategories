fetch('http://localhost:8080/categories')
.then((response) => response.json())
.then((categoryTree) => console.log(categoryTree));