import { AreaChart, XAxis, YAxis, CartesianGrid,Tooltip, Area, ResponsiveContainer } from "recharts";

const AnalyticCharts = ({data}) => {

    return (
        <div>
            <ResponsiveContainer width={'100%'} height={100}>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient> 
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="totalClick" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AnalyticCharts;