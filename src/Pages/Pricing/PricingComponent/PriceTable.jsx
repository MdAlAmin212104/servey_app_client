import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";

const PriceTable = () => {
  return (
    <div>
      <PricingTable highlightColor="#1976D2">
        <PricingSlot
        //   onClick={this.submit}
          buttonText="SIGN UP"
          title="BASIC"
          priceText="$24/month"
        >
          <PricingDetail>
            <b>35</b> projects
          </PricingDetail>
          <PricingDetail>
            <b>15 GB</b> storage
          </PricingDetail>
          <PricingDetail>
            <b>Unlimited</b> users
          </PricingDetail>
          <PricingDetail>
            <b>Time tracking</b>
          </PricingDetail>
        </PricingSlot>
        <PricingSlot
        highlighted
        //   onClick={this.submit}
          buttonText="SIGN UP"
          title="PROFESSIONAL"
          priceText="$99/month"
        >
          <PricingDetail>
            <b>100</b> projects
          </PricingDetail>
          <PricingDetail>
            <b>30 GB</b> storage
          </PricingDetail>
          <PricingDetail>
            <b>Unlimited</b> users
          </PricingDetail>
          <PricingDetail>
            <b>Time tracking</b>
          </PricingDetail>
        </PricingSlot>
        <PricingSlot
        //   onClick={this.submit}
          buttonText="SIGN UP"
          title="ENTERPRISE"
          priceText="$200/month"
        >
          <PricingDetail>
            <b>Unlimited</b> projects
          </PricingDetail>
          <PricingDetail>
            <b>75 GB</b> storage
          </PricingDetail>
          <PricingDetail>
            <b>Unlimited</b> users
          </PricingDetail>
          <PricingDetail>
            <b>Time tracking</b>
          </PricingDetail>
        </PricingSlot>
      </PricingTable>
    </div>
  );
};

export default PriceTable;
