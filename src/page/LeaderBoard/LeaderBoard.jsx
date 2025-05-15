import { useQuery } from "react-query";
import star from "../../assets/icons/star (4).png";
import star2 from "../../assets/icons/star (5).png";

const LeaderBoard = () => {
  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:3000/api/v1/user", {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await res.json();
    return data.data;
  });

  const sortedUsers = users.slice().sort((a, b) => b.point - a.point);

  return (
    <>
      <div className="overflow-x-auto lg:px-40 lg:py-8">
        <table className="table bg-slate-800">
          <thead>
            <tr>
              <th className="bg-pink-800 rounded-tl-xl py-4 text-slate-300">
                <label className="ml-5">User</label>
              </th>
              <th className="bg-pink-800 text-slate-300">Name</th>
              <th className="bg-pink-800 text-slate-300">From</th>
              <th className="bg-pink-800 text-slate-300">Match</th>
              <th className="bg-pink-800 text-slate-300">Points</th>
              <th className="bg-pink-800 text-slate-300">Improvement</th>
              <th className="bg-pink-800 text-slate-300 rounded-tr-xl">
                Badge
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user._id} className={index < 5 ? "bg-slate-950" : ""}>
                <td>
                  <label className="ml-5">{index + 1}</label>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm opacity-50 py-3">Chittagong</div>
                </td>
                <td>
                  <div className="font-bold">10</div>
                </td>
                <td>
                  <div className="font-bold">{user.point}</div>
                </td>
                <td>
                  <div className="font-bold">
                    {user.previousPoint !== undefined
                      ? (
                          ((user.point - user.previousPoint) /
                            user.previousPoint) *
                          100
                        ).toFixed(2)
                      : "N/A"}{" "}
                  </div>
                </td>
                <td>
                  {index < 5 ? (
                    <img
                      src={star} // Replace with your golden star badge image URL
                      alt="Golden Star Badge"
                      className="w-6 h-6"
                    />
                  ) : (
                    <img
                      src={star2} // Replace with your normal badge image URL
                      alt="Normal Badge"
                      className="w-6 h-6"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderBoard;
