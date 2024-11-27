"use client";

import React, { useState } from "react";
import styles from "@/styles/dashboard/settings/plans.module.scss";
import { RegularPoppins } from "@/components/typograhy";
import Prompt from "@/components/prompt";
import PrompStyles from "@/styles/components/prompt.module.scss";
import Dialog from "@/components/dialog";
import { CancelBtn, PrimaryButton } from "@/components/button";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GraphQLRequest } from "@/lib/graphQLRequest";
import { GetCompany } from "@/util/Query/company";
import store from "store2";
import Spinner from "@/components/spinner";
import {
  PaypalCancelSubscription,
  UpgradePaypalSubscription,
} from "@/util/Mutation/paypal.mutation";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/provider";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
export default function PlansAndBillings() {
  const router = useRouter();

  const user = store.get("UserAccount");

  const [toggle, setToggle] = useState(false);
  const [upgrade, setUpgrade] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["GetCompany"],
    queryFn: async () => {
      const { getMyCompanyByUserID } = await GraphQLRequest(GetCompany, {
        userId: user?.id,
      });

      return getMyCompanyByUserID;
    },
  });

  const CancelSMutation = useMutation({
    mutationKey: ["CancelSubscription"],
    mutationFn: async () => {
      return await GraphQLRequest(PaypalCancelSubscription, {
        userId: user?.id,
      });
    },
    onSuccess(data, variables, context) {
      toast.success("Successfully Subscription Cancelled");
      queryClient.invalidateQueries({
        queryKey: ["GetCompany"],
      });
      router.refresh();
    },
  });

  const UpgradeSMutation = useMutation({
    mutationKey: ["UpgradeSubscription"],
    mutationFn: async (inputValues: {
      subscriptionId: string;
      userId: string;
    }) => {
      return await GraphQLRequest(UpgradePaypalSubscription, inputValues);
    },
    onSuccess: () => {
      toast.success("Successsfully Account Upgraded");
      queryClient.invalidateQueries({
        queryKey: ["GetCompany"],
      });
      setToggle(false);
    },
  });

  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };

  const onHandleUpgrade = () => {
    setUpgrade(() => !upgrade);
  };

  const CancelFormik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      await CancelSMutation.mutate();
    },
  });

  const UpgradeFormik = useFormik({
    initialValues: {
      subscriptionId: "",
      userId: user?.id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await UpgradeSMutation.mutateAsync({
        userId: values.userId,
        subscriptionId: values.subscriptionId,
      });
    },
  });

  return (
    <div className={styles.container}>
      {toggle ? (
        <Dialog>
          <Prompt title="Cancel Subscriptions">
            <div className={PrompStyles.header}>
              <span>
                Canceling your subscription will revert your account to the
                Basic plan, limiting access to premium features. Are you sure
                you want to proceed?
              </span>
            </div>
            <div className={PrompStyles.footer}>
              <CancelBtn onClose={onHandleToggle} name="Cancel" />
              <form onSubmit={CancelFormik.handleSubmit}>
                <PrimaryButton
                  loading={CancelFormik.isSubmitting ? true : false}
                  name="Confirm"
                  type="submit"
                />
              </form>
            </div>
          </Prompt>
        </Dialog>
      ) : null}

      {upgrade ? (
        <Dialog>
          <Prompt title="Upgrade Plan">
            <div>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AXx3sBHkOLGsXGwDGUWHBuTamx3UXpGibk4lEMIGmK_qKfqtELMUK1AFFAN1uUuhNV3EkvqymcF44Ttp",
                  vault: true,
                  intent: "subscription",
                  dataSdkIntegrationSource: "button-factory",
                }}
              >
                <PayPalButtons
                  style={{
                    shape: "rect",
                    color: "blue",
                    layout: "vertical",
                    label: "subscribe",
                  }}
                  onCancel={() => {
                    UpgradeFormik.setSubmitting(false);
                    toast.error(
                      "Payment was canceled. Form submission has been halted."
                    );
                  }}
                  onApprove={(data): any => {
                    console.log(data);

                    console.log(data.subscriptionID);
                    UpgradeFormik.setFieldValue(
                      "subscriptionId",
                      data.subscriptionID
                    );

                    setTimeout(() => {
                      UpgradeFormik.handleSubmit(); // Ensure updated values
                      router;
                    }, 3000); // Let the state update cycle complete
                  }}
                  createSubscription={async (data, actions) => {
                    console.log(data);
                    return actions.subscription.create({
                      plan_id: "P-3XS60270TK051852HM4FCEIY",
                    });
                  }}
                ></PayPalButtons>
              </PayPalScriptProvider>
            </div>
            <div className={PrompStyles.footer}>
              <CancelBtn onClose={onHandleUpgrade} name="Cancel" />
            </div>
          </Prompt>
        </Dialog>
      ) : null}
      <div className={styles.planCard}>
        <div className={styles.headerPlan}>
          <h2>Current Plan</h2>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data?.user?.plan === "PRO" ? (
              <>
                <div className={styles.bodyPlan}>
                  <h2>PRO ACCOUNT</h2>
                  <div>
                    <span>Features: </span>
                    <ul>
                      <li>Unlimited Job Posting</li>
                      <li>90-Day Job Posting Duration</li>
                      <li>Application Tracking System</li>
                      <li>Schedule Management</li>
                      <li>Project Organizer</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.footer}>
                  <button onClick={onHandleToggle}>
                    <span className={RegularPoppins.className}>
                      Cancel Subscription
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.bodyPlan}>
                  <h2>Basic ACCOUNT</h2>
                  <div>
                    <span>Features: </span>
                    <ul>
                      <li>21-Day Job Posting Duration</li>
                      <li>1 Job Post Creation Per Day</li>
                      <li>Application Tracking System</li>
                      <li>Schedule Management</li>
                      <li>Project Organizer</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.footer}>
                  <button onClick={onHandleUpgrade}>
                    <b>Upgrade your Plan</b>
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
