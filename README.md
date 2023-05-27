# E-commerce Site Built With React.js, NextJS, Stripe, Sanity

<img src="/public/site.png">

An E-commerce store application built with React/NextJS, Stripe, Sanity, and focuses on setting up the checkout process and cart functions.

## Description

- Uses React Context and Context.Provider to store states of cart products, total price, quantities.
- Sanity is used to easily store the data of all the products, schemas are used to set up products.
- Was my first time setting up Stripe/an e-commerce application, so there are many notes explaining client set-up, params, check out handler etc - feel free to reference for your own Stripe set-up!

- Also uses Hot Toast for notifications and canvas confetti for the checkout completion page (/success).
- Images and project help from JS Mastery course - thank you!

- Please don't actually order any headphones 😂

<img src="/public/confetti.png">
<img src="/public/cart.png">

## Challenges

As I'm learning, I like to note a few challenges/bugs that I tackled:

- Tracking specific cart changes - removing/adding a quantity or reducing all have different cases and figuring out how to determine which product to adjust was one of the bigger challenges. I'm also newer to React, so I had to learn the spread operator to update/copy the cart, while also filtering out the old product data.

## Future Updates

- Add local storage so cart doesn't refresh upon reload.
- Cart updating fix- so that when an item quantity is adjusted, it's not moved in the cart order.

## Link

<link href='https://headphones-jmyers.vercel.app/'>View site</>
