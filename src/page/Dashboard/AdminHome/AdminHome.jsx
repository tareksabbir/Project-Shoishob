/* eslint-disable react/prop-types */
import { useQuery } from "react-query";
import Loading from "../../Loading/Loading";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const AdminHome = () => {
  const { data: adminStat, isLoading } = useQuery(["adminStat"], async () => {
    const res = await fetch(
      "http://localhost:5000/api/v1/stats/collection-counts",
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    const data = await res.json();
    return data.data;
  });

  if (isLoading) {
    return (
      <>
      <Loading></Loading>
      </>
    );
  }

  /// bar chart

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const data = [
    {
      name: "Bookings",
      uv: adminStat.bookingCount,
    },

    {
      name: "Paid",
      uv: adminStat.totalPaidCount,
    },
    {
      name: "Unpaid",
      uv: adminStat.totalUnPaidCount,
    },
  ];

  /// pi chart
  const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <section>

        <div
          id="main"
          className="main-content flex-1  mt-12 md:mt-2 pb-24 md:pb-5"
        >
          <div className="flex flex-wrap lg:p-24">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      <i className="fa fa-wallet fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-900">
                      Total Revenue
                    </h2>
                    <p className="font-bold text-xl text-gray-900">
                      BDT {adminStat.paidSum}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-pink-600">
                      <i className="fas fa-users fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-800">
                      Total Users
                    </h2>
                    <p className="font-bold text-xl text-gray-800">
                      {adminStat.usersCount}
                      <span className="text-pink-500 ml-3">
                        <i className="fas fa-exchange-alt"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-yellow-600">
                      <i className="fas fa-user-plus fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-800">
                      Total Turfs
                    </h2>
                    <p className="font-bold text-xl text-gray-800">
                      {adminStat.totalTurfCount}
                      <span className="text-yellow-600">
                        <i className="fas fa-caret-up ml-3"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-blue-600">
                      <i className="fas fa-server fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-800">
                      Total Bookings
                    </h2>
                    <p className="font-bold text-xl text-gray-800">
                      {adminStat.bookingCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-indigo-600">
                      <i className="fas fa-tasks fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-800">
                      Paid Bookings
                    </h2>
                    <p className="font-bold text-xl text-gray-900">
                      {adminStat.totalPaidCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-red-600">
                      <i className="fas fa-inbox fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-800">
                      UnPaid Bookings
                    </h2>
                    <p className="font-bold text-xl text-gray-900">
                      {adminStat.totalUnPaidCount}
                      <span className="text-red-500">
                        <i className="fas fa-caret-up ml-3"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  md:w-1/2 xl:w-1/3 p-6">
              <div className="bg-slate-100 rounded-xl">
                <BarChart
                  width={250}
                  height={200}
                  data={data}
                  margin={{
                    top: 40,
                    right: 5,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar
                    dataKey="uv"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
            <div className="w-full  md:w-1/2 xl:w-1/3 p-6">
              <ResponsiveContainer width="100%" height="100%" color="white">
                <BarChart width={150} height={40} data={data}>
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full  md:w-1/2 xl:w-1/3 p-6">
            <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data2}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </section>
    </>
  );
};

export default AdminHome;
