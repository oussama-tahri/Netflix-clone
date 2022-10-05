import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../Firebase';
import './PlansScreen.css'
import { loadStripe } from '@stripe/stripe-js'



function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        
        db.collection("customers")
          .doc(user.uid)
          .collection("subscriptions")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
          });
    }, [user.uid]);

    // useEffect(() => {
    //     db.collection("customers")
    //     .doc(user.uid)
    //     .collection("subscriptions")
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach(async (subscription) => {
    //          setSubscription({
    //             role: subscription.data().role,
    //             currrent_period_end: subscription.data().currrent_period_end.seconds,
    //             currrent_period_start: subscription.data().currrent_period_start.seconds,
    //           }); 
    //         });
          
            
    //     });
    // }, [user.uid]);


    useEffect(() => {
        db.collection("products")
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    }
                })
            })
            setProducts(products);
        })
    }, []);

    console.log(products);
    console.log(subscription);

    const loadChekout = async (priceId) => {
        const docRef = await db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const {error, sessionId} = snap.data();

            if (error) {
                //show an error to costumer and 
                //impact the cloud function logs in the firebase console
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId) {
                //we have a session, let's redirect to checkout
                //init Stripe

                const stripe = await loadStripe("pk_test_51LpKcgKxIdym54oDw7AAEUmpKMT4g1pyjg1nRE0PcYFA8y3MdbfrpJrFt1gNqRDdNbG1wcLveGg1VeHVDHyL8mcq00ypjLEmeZ");

                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

  return (
    <div className='plansScreen'>
        <br />
        {subscription && (
        <p>
            Renewal date:{" "}
            {new Date(
               subscription?.current_period_end * 1000 
            ).toLocaleDateString()}
        </p>
        )}
        {Object.entries(products).map(([productId, productData]) => {
            //TODO: add some logic to check if the user's subscription is active ...
            const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

            return (
                <div key={productId} className={`${isCurrentPackage && "planScreen_plan--disabled"} planScreen_plan`}>
                    <div className='planScreen_info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>

                    <button onClick={() => !isCurrentPackage && loadChekout(productData.prices.priceId)}>
                        {isCurrentPackage ? "Current Package" : "Subscribe"}
                    </button>
                </div>
            );
        })}
    </div>
  )
}

export default PlansScreen