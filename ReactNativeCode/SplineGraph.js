
const screenWidth = Dimensions.get("window").width;
import { LineChart } from "react-native-chart-kit";

import React, { useRef, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import Popover from "react-native-popover-view";

export default function SplineGraph()  {

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        data: [60, 70, 75, 80, 99, 100,90, 80, 75, 80, 99, 100],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Months of the year"] // optional
  };



  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState({ x: 0, y: 0 });
  const [popoverText, setPopoverText] = useState("");
  const [popoverPlacement, setPopoverPlacement] = useState("auto");


  const handleDataPointClick = (params) => {
    if (params) {
      console.log({ params });
      setPopoverText(`Clicked on data point: ${labels[params.index]}, ${params.value}`);
      setPopoverAnchor({ x: params.x, y: params.y });
      setPopoverVisible(true);
      setPopoverPlacement(popoverPlacement)
    }
  };

  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const showPopover = () => {
    console.log('showPopover') 
  };

  return (
    <View style={{ flex: 1 }}>
     
      <LineChart
        data={data}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        withDots={true}
        onDataPointClick={handleDataPointClick}
      />
      
      <Popover
        isVisible={popoverVisible}
        fromRect={{ x: popoverAnchor.x, y: popoverAnchor.y, width: 1, height: 1 }}
        onRequestClose={hidePopover}
        onPopoverDisplayed={showPopover}
        placement={popoverPlacement}
      >
        <View style={{ padding: 10 }}>
          <Text>{popoverText}</Text>
        </View>
      </Popover>
    </View>
  );
}