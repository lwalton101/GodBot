import {Chart} from "chart.js";
import {ChartJSNodeCanvas} from "chartjs-node-canvas";

Chart.register({
    id: "bg",
    beforeDraw(chart: Chart, args: { cancelable: true }, options: any): boolean | void {
            var ctx = chart.ctx;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chart.width, chart.height);
    }
});

export function init(){
    console.log("Init chart")
}

export const chart = new ChartJSNodeCanvas({width: 1920, height: 1080});