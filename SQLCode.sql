-- Products table

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `quantity` varchar(15) NOT NULL,
  `image` varchar(255),
  `location` varchar(15),
  `price` DECIMAL(5,2),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--Reservations TABLE
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int,
  `product_id` int,
  `quantity` int,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;