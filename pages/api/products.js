import {query} from "./db"

export default async function handler(req,res){
    let message;

    //get the data:
    if(req.method === "GET"){

        const products = await query({
            query:"SELECT * FROM products",
            values:[]
        });


       res.status(200).json({products: products}); 
    }
    //add to the User:
    else if (req.method === "POST") {
        const { action, details } = req.body;
        if(action === "addUser"){
            const {name, email} = details;
            try {
                const addUser = await query({
                    query: "INSERT INTO users (name, email) VALUES (?, ?)",
                    values: [name, email],
                });

                if (addUser.insertId) {
                    res.status(200).json({ response: { message: "success"}});
                } else {
                    res.status(500).json({ response: { message: "error" } });
                }
            } catch (error) {
                console.error("Error adding user:", error);
                res.status(500).json({ response: { message: "error" } });
            }
        }
        //add to the reservations:
        else if(action === "addReservation"){
            const {email, product_id, quantity} = details;

            // Check if a user with the given email exists
            const userRows = await query({
                query:"SELECT id FROM users WHERE email = ?",
                values: [email],
            });


            if(userRows.length === 0){
                return res.status(404).json({ error: "User not found" });
            }

            //user id:
            const user_id = userRows[0].id;

            try {
                // Add to the reservations table
                const addReservation = await query({
                    query: "INSERT INTO reservations (user_id, product_id, quantity) VALUES (?, ?, ?)",
                    values: [user_id, product_id, quantity],
                });

                // Check if the reservation was successfully added
                if (addReservation.insertId) {
                    res.status(200).json({ response: { message: "success"}});
                } else {
                    res.status(500).json({ response: { message: "error" } });
                }
            } catch (error) {
                console.error("Error adding user:", error);
                res.status(500).json({ response: { message: "error" } });
            }

        }
    }
    //update the products:
    else if(req.method === "PUT"){
        const { action, details } = req.body;
        const {email, product_id, quantity} = details;

        // Check if a product with the given product_id exists
        const totalQuantity = await query({
            query:"SELECT quantity FROM products WHERE id = ?",
            values: [product_id],
        });

        //checks that the product id exists:
        if(totalQuantity.length === 0){
            return res.status(404).json({ error: "Product not found" });
        }

        //update the products:
        try {
            //update the products table
            const updatedProducts = await query({
                query: "UPDATE products SET quantity = ? WHERE id = ?",
                values: [totalQuantity[0].quantity - quantity, product_id], // Note the change here
            });

            // Check if the table was successfully updated
            res.status(200).json({ response: { message: "success"}, products: updatedProducts});
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({ response: { message: "error" } });
        }

    }
};