//get Products list
function getProductsList() {
	document.getElementById('main').innerHTML = "";
	fetch('http://localhost:3000/products')
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			var productList = data;
			createCardsInHtml(productList)
		})
		.catch(error => {
			document.getElementById('main').innerHTML = 
				`<div>Sorry No Data Found please run json server to get the data </div>`;
		});
}
// onclick="window.location='./product.html'"

//create cards html structure
function createCardsInHtml(productList) {
	let totalRating = 5;
	productList.forEach(function (product) {
		document.getElementById('main').innerHTML += `
				<div class="product-card">
					<img src="./images/${product.img}" class="productImage" onclick="loadImage(${product.id}); openNav('250px')" alt="${product.name}" width="100%" height="230">
					<p class="product-card-name">${product.name}</p>
					<div class="product-card-category">
						<p>${product.category}</p>
						<p>${product.price}</p>
					</div>
					<div class="product-card-category">
						<div class="outer-star">
							<div id="innerStar${product.id}" class="inner-star"></div>
						</div>
						<i class="fa fa-cart-plus" aria-hidden="true"></i>
					</div>
				</div>`
		const ratingPercentage = product.rating / totalRating * 100;
		var ratingRoundFig = Math.round(ratingPercentage / 10) * 10 + '%'
		star = document.getElementById(`innerStar${product.id}`);
		star.style.width = ratingRoundFig;
	});
}

//get Category filter list
function getCategoryList() {
	fetch('http://localhost:3000/category')
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			const categoryList = data;
			//populate category list
			categoryList.forEach(function (category) {
				document.getElementById('categoryList').innerHTML += `
				<div class="list-group" onclick="filterProductByCategory('${category.key}')">
					<a class="list-group-item list-group-item-action" onclick="openNav('250px')">${category.key}</a>
				</div>`
			});
		})
		.catch(error => {
			document.getElementById('main').innerHTML = `
				<div>Sorry No Data Found please run json server to get the data </div>
			`;
		});
}

//get color filter list
function getColoursList() {
	fetch('http://localhost:3000/colors')
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			const colorsList = data;
			//populate Colors list
			colorsList.forEach(function (color) {
				document.getElementById('colorList').innerHTML += `
				<div class="list-group" onclick="filterProductByColor('${color.key}')">
					<a class="list-group-item list-group-item-action" onclick="openNav('250px')">${color.key}</a>
				</div>`
			});
		})
		.catch(error => {
			document.getElementById('main').innerHTML = `
				<div>Sorry No Data Found please run json server to get the data </div>`;
		});
}

//filter products by color
function filterProductByColor(color) {
	document.getElementById('main').innerHTML = "";
	fetch('http://localhost:3000/products')
		.then(response => {
			return response.json();
		})
		.then(function (data) {
			let productList = data;
			productList = productList.filter(t => t.color == color);
			createCardsInHtml(productList);
		});
}

//filter products by category
function filterProductByCategory(category) {
	document.getElementById('main').innerHTML = "";
	fetch('http://localhost:3000/products')
		.then(response => {
			return response.json();
		})
		.then(function (data) {
			let productList = data;
			productList = productList.filter(t => t.category == category);
			createCardsInHtml(productList);
		});
}

//load the selected image
function loadImage(id) {
	document.getElementById('main').innerHTML = "";
	fetch(`http://localhost:3000/products/${id}`)
		.then(response => {
			if (!response.ok) {
				throw Error("Error");
			}
			return response.json();
		})
		.then(function (data) {
			const product = data;
			document.getElementById('main').innerHTML = `
					<div class="row product-position">
							<div class="col-md-4">
									<img src="./images/${product.img}" class="card-img-top" width="150" height="310" alt="${product.name}">
							</div>
							<div class="col-md-6">
								<p>${product.category}</p>
								<h3>${product.name}</h3>
								<p>${product.description}</p>
								<div class="row">
										<div class="col-md-5"> Price per unit <br> ${product.price}</div>
										<div class="col-md-3"></div>
										<div class="col-md-4 product-style">
												<button id="myBtn" class="btn btn-primary buy-now-btn">Buy Now</button>
												<span class="cart-position">
												<i class="fa fa-cart-plus product-cart-icon" aria-hidden="true"></i>
												</span>
										</div>
								</div>
							</div>
					</div>`
		})
		.catch(error => {
			document.getElementById('main').innerHTML = `
				<div>Sorry No Data Found please run json server to get the data </div>
			`;
		});
}

//get searched text and load data
function filterProduct(searchedText) {
	document.getElementById('main').innerHTML = "";
	fetch('http://localhost:3000/products')
		.then(response => {
			return response.json();
		})
		.then(function (data) {
			var productList = data;
			if(typeof(searchedText) == "number") {
				var data = searchCardByRange(searchedText, productList);
			} else {
				var data = searchCards(searchedText, productList);
			}
			createCardsInHtml(data);
		});
}

//get searched text and filter from list
function searchCards(searchedText, data) {
	var filterdData = [];
	for(let i=0; i<data.length; i++){
		searchedText = searchedText.toLowerCase();
		var name = data[i].name.toLowerCase();
		if(name.includes(searchedText)){
			filterdData.push(data[i]);
		}
	}
	return filterdData;
}

//filter list by price range
function searchCardByRange(searchedText, data) {
	var filterdData = [];
	for(let i=0; i<data.length; i++){
		var rating = data[i].rating
		var range = parseFloat(rating);
		var ratingRoundFig = Math.round(range);
		if(searchedText == ratingRoundFig){
			filterdData.push(data[i]);
		}
	}
	return filterdData;
}

function onBuyProduct() {

}