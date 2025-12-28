import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import ReligionSalesTable from "./ReligionSalesTable";
import { SalesByReligionChart } from "./SalesByReligionChart";


interface Props {
  religionChartData: any[];
}

const ReligionSalesSection: React.FC<Props> = ({ religionChartData }) => {
  const [activeTab, setActiveTab] = useState("chart");

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  return (
    <MDBCard className="shadow-none border border-dark rounded-0 mt-3">
      <MDBCardBody>
        <MDBCardTitle className="text-decoration-underline mb-3">
          Sales Distribution by Religion
        </MDBCardTitle>

        <MDBTabs className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleTabClick("chart")}
              active={activeTab === "chart"}
            >
              Chart View
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleTabClick("table")}
              active={activeTab === "table"}
            >
              Table View
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={activeTab === "chart"}>
            <SalesByReligionChart data={religionChartData} />
          </MDBTabsPane>
          <MDBTabsPane show={activeTab === "table"}>
            <ReligionSalesTable data={religionChartData} />
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ReligionSalesSection;
