import ChainSetup from "./ChainSetup";

interface PaymentDriverConfig {
    id: number;

    chainSetup: { [key: number]: ChainSetup };
    backendUrl: string;
}
export default PaymentDriverConfig;
