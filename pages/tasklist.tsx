import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";
import { useEffect, useState } from 'react';
import Image from "next/image";

import "../app/globals.css";

import standingdollarcoin from "../public/assets/standingdollarcoin.svg";

import Task from "../public/assets/task.png";

import BackButton from "../public/assets/backButton.svg";
import { claimTaskDoneReward, getAllTasks, getDoneTasks } from '@/scripts';
import { useAppContext } from '@/context';
import { showInfoMessage } from '@/scripts/utils';
// import  DayOneOverlay  from "@/app/components/DayOneOverlay";

interface task {
    id: number;
    task_name: string;
    task_reward: string;
    task_description: string;
    task_url: string;
}
interface doneTask {
    id: number;
    task_id: number,
}
export default function TaskList() {
    const router = useRouter(); // Initialize the router
    const { userId, task, setTask, doneTasks, setDoneTasks, userBalance, setUserBalance } = useAppContext();
    const handleBackClick = () => {
        router.back(); // Go back to the previous page
    };
    const [isDoningTask, setIsDoingTask] = useState(false);

    const load = async () => {
        await getDoneTasks(userId, setDoneTasks);
        await getAllTasks(setTask);

    }

    useEffect(() => {
        if (userId) {
            load();
        }

    }, []);
    const isInviteClaimed = (donetaskId: number) => {
        if (doneTasks) {

            const result = doneTasks.find((doneTask: doneTask) => doneTask.task_id == donetaskId);

            return !!result;
        } else {
            return false;
        }
    }
    const doTasks = async (taskId: number, task_url: string, task_reward: string) => {
        if (!isDoningTask) {
            window.open(task_url, '_blank');

            setIsDoingTask(true);
            setTimeout(() => {
                claimReward(taskId, parseInt(task_reward));
                setIsDoingTask(false);


            }, 15000);
        } else {
            showInfoMessage('Checking for task completion');
        }
    }
    const claimReward = async (taskId: number, task_reward: number) => {
        const isSuccessful = await claimTaskDoneReward(userId, taskId);
        load();
        if (isSuccessful) {
            setUserBalance(parseInt(userBalance) + task_reward);
        }
    }



    return (

        <>
            <GameNavbar />

            <div className="relative bg-[#000000] pt-16 pb-20" style={{ minHeight: '100vh' }}>
                <div className="flex flex-col items-center justify-center text-center">
                    <Image src={standingdollarcoin} alt="standingdollarcoin" width={50} height={50} />
                    <h1 className="pt-[20px] text-[24px] leading-[44px] text-white font-bold">TASKS</h1>
                    <h5 className="  leading-[44px] text-white font-bold">Earn More Coins</h5>
                </div>

                <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                    <Image src={BackButton} alt="BackButton" />
                </div>




                <div>
                    <h1 className="pl-[16px] text-[12px] leading-[44px] text-white font-bold">Task list ({doneTasks.length ?? 0} Done)</h1>

                    {
                        task?.map((task: task) => (
                            <div key={task.id} className="flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                                <div className="flex gap-6">
                                    <Image src={Task} alt="TelegramApp" width={40} height={20} className='h-[100%]' />

                                    <div className="flex flex-col gap-y-0">
                                        <h2 className="text-[12px] text-white font-semibold">{task.task_name ?? "Task"}</h2>
                                        <h6 className="text-[10px] text-white my-2">{task.task_description ?? ""}</h6>


                                    </div>
                                    <span className="flex">
                                        <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                        <p className="text-[12px] leading-[44px] text-white font-normal">{task.task_reward}</p>
                                    </span>
                                </div>

                                <div className="border-[1px] border-[#FFC247] text-[12px] cursor-pointer  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px]">
                                    {
                                        isInviteClaimed(task.id) ? (
                                            <h2 className="text-center -mt-[4px]">CLAIMED</h2>
                                        ) : (
                                            <h2 onClick={() => doTasks(task.id, task.task_url, task.task_reward)} className="text-center -mt-[4px]">{isDoningTask ? "Checking..." : "GO"}</h2>
                                        )
                                    }
                                </div>

                            </div>
                        ))

                    }


                </div>




            </div>


        </>
    )
}