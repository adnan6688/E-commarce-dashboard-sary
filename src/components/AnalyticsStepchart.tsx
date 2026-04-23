import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface ChartData {
  month: string;
  current: number;
  previous: number;
}

const AnalyticsStepchart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    if (root._logo) root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 20,
        layout: root.verticalLayout,
      })
    );

    // X-Axis
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });
    xRenderer.grid.template.setAll({ strokeDasharray: [3, 3] });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: xRenderer,
      })
    );

    // Y-Axis Configuration for $1000 steps
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 40 // Controls how many labels show up
    });
    yRenderer.grid.template.setAll({ strokeDasharray: [3, 3] });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0, 
        extraMax: 0.1,
        numberFormat: "'$'#", 
        renderer: yRenderer,
      })
    );

    // Force labels to show in increments of 1000
    // Note: amCharts 5 chooses intervals based on data, 
    // but adjusting minGridDistance is the responsive way.

    // --- TOOLTIP SETUP ---
    // This creates a shared tooltip that follows the cursor
    const tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      labelText: "[bold]{name}[/]: $[bold]{valueY}[/]",
    });
    
    tooltip.get("background")?.setAll({
      fill: am5.color(0xffffff),
      fillOpacity: 0.9,
      stroke: am5.color(0xdddddd),
      shadowColor: am5.color(0x000000),
      shadowBlur: 10,
      shadowOpacity: 0.1,
    });

    // --- SERIES 1 (Orange) ---
    const series1 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Current Year",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "current",
        categoryXField: "month",
        stroke: am5.color("#EC7427"),
        tooltip: tooltip // Attach the tooltip
      })
    );

    series1.setAll({ fill: am5.color("#EC7427") });
    series1.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: am5.color("#EC7427"), opacity: 0.6 },
          { color: am5.color("#EC7427"), opacity: 0 }
        ],
        rotation: 90
      })
    });

    series1.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color("#ffffff"),
        stroke: am5.color("#EC7427"),
        strokeWidth: 2,
      }),
    }));

    // --- SERIES 2 (Blue) ---
    const series2 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Previous Year",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "previous",
        categoryXField: "month",
        stroke: am5.color("#2289C9"),
        tooltip: am5.Tooltip.new(root, {
          labelText: "[bold]{name}[/]: $[bold]{valueY}[/]"
        })
      })
    );

    series2.setAll({ fill: am5.color("#2289C9") });
    series2.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          { color: am5.color("#2289C9"), opacity: .6 },
          { color: am5.color("#2289C9"), opacity: 0 }
        ],
        rotation: 90
      })
    });

    series2.bullets.push(() => am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color("#ffffff"),
        stroke: am5.color("#2289C9"),
        strokeWidth: 2,
      }),
    }));

    // Data - Updated to reflect $1000+ values
    const data: ChartData[] = [
      { month: "Jan", current: 5000, previous: 4000 },
      { month: "Feb", current: 7500, previous: 4500 },
      { month: "Mar", current: 2000, previous: 5000 },
      { month: "Apr", current: 9800, previous: 6000 },
      { month: "May", current: 9200, previous: 7000 },
      { month: "Jun", current: 4300, previous: 5500 },
      { month: "Jul", current: 3800, previous: 4000 },
      { month: "Aug", current: 7200, previous: 6500 },
      { month: "Sept", current: 4200, previous: 3000 },
      { month: "Oct", current: 8800, previous: 7500 },
      { month: "Nov", current: 4100, previous: 5000 },
      { month: "Dec", current: 2600, previous: 3500 },
    ];

    xAxis.data.setAll(data);
    series1.data.setAll(data);
    series2.data.setAll(data);

    // Add Cursor for better hover experience
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none",
      xAxis: xAxis
    }));

    // Legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 20,
      })
    );
    legend.markers.template.setAll({ width: 12, height: 12 });
    legend.data.setAll(chart.series.values);

    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] lg:h-[480px] bg-white p-4 border rounded-3xl border-gray-300 flex flex-col">
      <div ref={chartRef} className="w-full flex-1" />
    </div>
  );
};

export default AnalyticsStepchart;