import type { NextPage } from "next";
import Layout from "../components/layout";
import useUser from "../lib/client/useUser";

const Profile: NextPage = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <Layout hasTabBar title="나">
      <div className="px-4">
        <div className="flex items-center mt-4 space-x-3">
          <div className="w-16 h-16 bg-slate-500 rounded-full" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">{user?.name}</span>
            <span className="font-medium text-gray-900">{user?.phone}</span>
          </div>
        </div>
        <div className="mt-10 flex justify-around">
          <div className="flex flex-col items-center">
            <div className="text-[#FC5200] text-sm">팔로잉</div>
            <div className="font-bold text-2xl">0</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#FC5200] text-sm">팔로워</div>
            <div className="font-bold text-2xl">2</div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex space-x-4 items-center">
            <img className="w-6" src="/images/ico-running.png" />
            <div className="font-semibold text-base">이번 주</div>
          </div>
          <div>
            <div className="mt-5 flex justify-between">
              <div className="flex flex-col">
                <div className="text-sm">거리</div>
                <div className="font-bold text-xl">0 km</div>
              </div>
              <div className="border-r-2" />
              <div className="flex flex-col">
                <div className="text-sm">시간</div>
                <div className="font-bold text-xl">0시간</div>
              </div>
              <div className="border-r-2" />
              <div className="flex flex-col">
                <div className="text-sm">누적 상승고도</div>
                <div className="font-bold text-xl">0 m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
