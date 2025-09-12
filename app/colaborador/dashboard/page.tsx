'use client'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

export default function Dashboard(){

    const data = 
[
  {
    "id": "sass",
    "label": "sass",
    "value": 442,
    "color": "hsl(26, 70%, 50%)"
  },
  {
    "id": "hack",
    "label": "hack",
    "value": 342,
    "color": "hsl(260, 70%, 50%)"
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 509,
    "color": "hsl(63, 70%, 50%)"
  }
]

    const dataLine = [
  {
    "id": "japan",
    "data": [
      {
        "x": "plane",
        "y": 128
      },
      {
        "x": "helicopter",
        "y": 43
      },
      {
        "x": "boat",
        "y": 29
      },
      {
        "x": "train",
        "y": 117
      },
      {
        "x": "subway",
        "y": 95
      },
      {
        "x": "bus",
        "y": 146
      },
      {
        "x": "car",
        "y": 274
      },
      {
        "x": "moto",
        "y": 120
      },
      {
        "x": "bicycle",
        "y": 142
      },
      {
        "x": "horse",
        "y": 190
      },
      {
        "x": "skateboard",
        "y": 51
      },
      {
        "x": "others",
        "y": 172
      }
    ]
  },
]

    return(
        <>
            <div className="h-full w-full flex flex-col space-y-1">
                <div className="h-full w-full flex space-x-1">
                    <div className="h-full w-[40%] bg-[#ffff] rounded-md shadeow-md p-2">
                        <h1 className="text-[#993399] font-semibold">Total de Tarefas Realizadas</h1>
                        <div className="h-full w-full flex justify-center items-center">
                            <h1 className="text-[70px] text-[#993399]">9</h1>
                        </div>
                    </div>
                    <div className="h-full w-full bg-[#ffff] rounded-md shadeow-md p-2">
                        <h1 className='text-[#993399] font-semibold'>Porcentagem dos Tipos de Tarefa</h1>
                        <div className="h-full w-full items-end justify-end">
                                <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
                        startAngle={-54}
                        innerRadius={0.25}
                        padAngle={2}
                        cornerRadius={13}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'pink_yellowGreen' }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={14}
                        arcLabelsTextColor="black"
                        motionConfig="stiff"
                        transitionMode="startAngle"
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                symbolShape: 'circle'
                            }
                        ]}
                    />
                        </div>
                    </div>
                </div>
                <div className="h-full w-full bg-[#ffff] rounded-md shadeow-md">
                    <ResponsiveLine
                data={dataLine}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="cardinal"
                axisBottom={{ legend: 'transportation', legendOffset: 36 }}
                axisLeft={{ legend: 'count', legendOffset: -40 }}
                colors={{ scheme: 'purpleRed_green' }}
                lineWidth={6}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'seriesColor' }}
                pointLabelYOffset={-12}
                areaOpacity={0}
                enableTouchCrosshair={true}
                useMesh={true}
                isInteractive={false}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 22,
                        symbolShape: 'circle'
                    }
                ]}
            />
                </div>
            </div>
        </>
    );
}