import { init, createElement } from "@airwallex/components-sdk";
import { doCreateAirwallaxClient } from "~/utils/airwallax.api";

export const useAirwallax = (id: string) => {
  const isLoading = ref(true);
  const registerStore = useRegisterStore();
  const config = useRuntimeConfig();
  let paymentForm: any;

  console.log(config.airwallaxMode)
  const initAirwallax = async () => {
    try {
      const temp = localStorage.getItem("temp");
      if (!temp) {
        throw new Error("No temp data found in localStorage");
      }
      let client = await JSON.parse(temp);
      const { clientSecret, clientId, checkoutId } =
        await doCreateAirwallaxClient(client);
      const { billing } = await init({
        env: (config.airwallaxMode as "demo" | "prod") || "demo",
        enabledElements: ["billing"],
      });
      const checkout = await billing?.createCheckout({
        client_secret: clientSecret,
      });

      //@ts-ignore
      paymentForm = await checkout?.createElement("paymentForm");

      paymentForm?.on("ready", () => {
        isLoading.value = false;
      });

      paymentForm?.on("success", async () => {
        try {
          const checkoutInfo = await doBillingComplete(checkoutId, clientId);
          registerStore.setActiveTab(2);
        } catch (error) {
          console.log(error);
          console.log("Error");
        }
      });

      paymentForm?.on("error", (error: any) => {
        console.log(error);
        console.log("ERROR");
      });

      paymentForm?.mount(id);
    } catch (error) {
      console.log(error);
      registerStore.setActiveTab(0);
    }
  };

  onMounted(async () => {
    isLoading.value = true;
    await initAirwallax();
  });

  onUnmounted(async () => {
    (paymentForm)?.unmount();
  });

  return { isLoading };
};
