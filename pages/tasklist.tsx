import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";
import { useEffect, useState } from 'react';
import Image from "next/image";

import "../app/globals.css";

import standingdollarcoin from "../public/assets/standingdollarcoin.svg";

import Task from "../public/assets/list.png";

import BackButton from "../public/assets/backButton.svg";
import { claimTaskDoneReward, getAllTasks, getDoneTasks } from '@/scripts';
import { useAppContext } from '@/context';
import { showInfoMessage } from '@/scripts/utils';
// import  DayOneOverlay  from "@/app/components/DayOneOverlay";

interface task {
    task_id: number;
    task_name: string;
    task_reward: string;
    description: string;
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
    const [isDoningTask, setIsDoingTask] = useState<number|null>(null);

    const load = async () => {
        await getDoneTasks(userId, setDoneTasks);
        await getAllTasks(setTask);

    }

    useEffect(() => {
        if (userId) {
            load();
        }

    }, []);
    const IsTaskDone = (donetaskId: number) => {
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

            setIsDoingTask(taskId);
            setTimeout(() => {
                claimReward(taskId, parseInt(task_reward));
                setIsDoingTask(null);


            }, 15000);
        } else {
            showInfoMessage('Still checking for task completion');
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
                    <h5 className="  leading-[44px] text-white font-bold">EARN MORE COINS</h5>
                </div>

                <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                    <Image src={BackButton} alt="BackButton" />
                </div>




                <div>
                    <h1 className="pl-[16px] text-[12px] leading-[44px] text-white font-bold">TASK LIST ({doneTasks.length ?? 0} COMPLETED)</h1>

                    {
                        task?.map((task: task) => (
                            <div key={task.task_id} className='flex flex-col border-[0.5px] border-[#FFFFFF73] p-[16px]'>
                                <div  className="flex items-center justify-between  ">

                                    <div className="flex items-center gap-6">
                                        <Image src={Task} alt="TelegramApp" width={30} height={30} className='h-[100%]' />

                                        <div className="flex items-center w-full">
                                            <h2 className="text-[16px] text-white">{task.task_name ?? "Task"}</h2>
                                        </div>

                                    </div>
                                    <div className="flex items-center">
                                        <span className="flex mx-3">
                                            <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            <p className="text-[12px] leading-[44px] text-white font-normal font-semibold">{task.task_reward}</p>
                                        </span>
                                        <div className="bg-[#FFFFFF26] cursor-pointer font-bold items-center p-2 px-3 rounded-[8px] text-[12px] text-white">
                                            {
                                                IsTaskDone(task.task_id) ? (
                                                    <h2 className="text-center -mt-[4px]">DONE</h2>
                                                ) : (
                                                    <h2 onClick={() => doTasks(task.task_id, task.task_url, task.task_reward)} className="text-center">{isDoningTask=== task.task_id? "Checking..." : "GO"}</h2>
                                                )
                                            }
                                        </div>
                                    </div>


                                </div>

                                <h6 className="text-[12px] text-white my-2">{task.description ?? ""}</h6>
                            </div>
                        ))

                    }


                </div>




            </div>


        </>
    )
}