import { useAuth } from "../providers/AuthProvider";

const Profile = () => {
  const { userInfo } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-sky-500">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome, {userInfo.name}
        </h1>
        <div className="space-y-4">
          <p className="text-lg font-medium">
            Role: <span className="text-sky-500">{userInfo.role}</span>
          </p>
          <p className="text-lg font-medium">
            Email: <span className="text-sky-500">{userInfo.email}</span>
          </p>
          <p className="text-lg font-medium">
            Phone Number:{" "}
            <span className="text-sky-500">{userInfo.mobileNumber}</span>
          </p>
          <p className="text-lg font-medium">
            Balance: {userInfo.balance}
            <span className="text-sky-500">TK</span>
          </p>
          {userInfo?.status == "pending" && (
            <p className="text-lg text-center font-medium">
              Your account is in pending wait for admin approved and get{" "}
              <span className="text-sky-500">Bonus money</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
