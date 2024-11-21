"use client"

import React from 'react';
import { PayPalScriptProvider, PayPalButtons, } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

export default function PayPalBasicPlan({ handleSubmit, values, setSubmitting }: any) {

    return (
        <div>
            <PayPalScriptProvider options={{
                clientId: "AWAE5k1VDEYQNHJGE52bE7vWD9RPNTf2hfpaFUPTAcBaqLNLNpVhmNSZ9X5bVYYN5kOKK_uDBGaH9Wnj",
                vault: true,
                intent: "subscription",
                dataSdkIntegrationSource: "button-factory",
            }}>
                <PayPalButtons
                    style={{
                        shape: 'rect',
                        color: 'blue',
                        layout: 'vertical',
                        label: 'subscribe'
                    }}
                    onCancel={() => {
                        setSubmitting(false)
                        toast.error("Payment was canceled. Form submission has been halted.");

                    }}
                    onApprove={(): any => {
                        try {
                            handleSubmit();
                            alert("Subscription successful and account created.");
                        } catch (error) {
                            console.error("Account creation failed:", error);
                            alert("An error occurred during account creation. Please try again.");
                        }
                    }}
                    createSubscription={(data: Record<string, unknown>, actions: any): any => {
                        return actions.subscription.create({
                            plan_id: process.env.NEXT_PUBLIC_BASIC_PLAN_ID as string,

                        }).catch((err: any) => {
                            console.error("Subscription Error:", err);
                            alert("An error occurred. Please try again.");
                        });
                    }}
                ></PayPalButtons>
            </PayPalScriptProvider>
        </div >
    )
}
