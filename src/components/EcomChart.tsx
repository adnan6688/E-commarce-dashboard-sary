import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const EcomChart = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");
    
    // Remove amCharts logo
    if (root._logo) {
      root._logo.dispose();
    }

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout: root.verticalLayout,
        innerRadius: am5.percent(60)
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
        alignLabels: false 
      })
    );

    // --- REMOVE LINES AND LABELS ---
    series.ticks.template.set("forceHidden", true);
    series.labels.template.set("forceHidden", true);

    // --- UPDATED COLORS (Pending, Shipped, Delivered) ---
    series.set("colors", am5.ColorSet.new(root, {
      colors: [
        am5.color(0x8D82FF), // Pending (Light Purple)
        am5.color(0xFF8F82), // Shipped (Soft Red/Coral)
        am5.color(0x3CC3DF)  // Delivered (Cyan/Blue)
      ]
    }));

    // --- CLEAN SLICE STYLING ---
    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff),
      cornerRadius: 10,
      toggleKey: "none",
      shadowOpacity: 0
    });

    series.slices.template.set("fillGradient", undefined);
    series.slices.template.set("fillPattern", undefined);

    // --- UPDATED DATA (3 Slices) ---
    series.data.setAll([
      { category: "Pending", value: 400 },   //
      { category: "Shipped", value: 300 },   //
      { category: "Delivered", value: 300 }  //
    ]);

    // --- LEGEND ---
    const legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 15,
      marginBottom: 15,
    }));

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default EcomChart;