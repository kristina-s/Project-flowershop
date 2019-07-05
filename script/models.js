class Flower
{
	constructor(id, name, latinName, titleImage, humidity, light, description, bloomTime, price, images)
	{
		this.id = id;
		this.name = name;
		this.latinName = latinName;
		this.titleImage = titleImage;
		this.description = description;
		this.bloomTime = bloomTime;
		this.humidity = humidity;
		this.light = light;
		this.price = price;
		this.images = images;
	}	
}

class OrderItem
{
	constructor(quantity, item)
	{
		this.quantity = quantity;
		this.item = item;
	}
}

class Order
{
	constructor(totalPrice, name, address, city, cardNumber)
	{
		this.totalPrice = totalPrice;
		this.name = name;
		this.address = address;
		this.city = city;
		this.cardNumber = cardNumber;
	}
}

