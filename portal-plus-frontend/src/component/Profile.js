import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect } from "react";
import { getRule } from "../store/";

export const Profile = () => {
    const dispatch = useDispatch();
    const { name, userId, rule } = useSelector((state) => {
        return state.auth;
    });

    useEffect(() => {
        dispatch(getName());
        dispatch(getRule());
    }, [dispatch]);

    return (
        <div>
            <div className={`bg-[#334e7d] flex items-center justify-between flex-col w-64 absolute top-12 left-0 p-5 hidden md:flex `}>
                <img alt="userImg" src="/userPfp.jpg" className="rounded-full h-16 w-16" />
                <p className="text-white text-xl px-4 pt-2 font-medium hidden sm:flex">
                    {name}
                </p>
                <p className="text-white text-xs px-4 hidden sm:flex">
                    هندسة البرمجيات
                </p>
                <div className='flex flex-row items-center justify-between m-4' >
                    <button
                        className="bg-white text-[#354d7a] rounded-xl flex hover:text-[#5175BA] text-xs border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-24 h-10 flex items-center justify-center"
                        type="submit"
                    >
                        تسجيل خروج
                    </button>
                    <button
                        className="bg-white text-[#354d7a] rounded-xl flex hover:text-[#5175BA] text-xs border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-24 h-10 flex items-center justify-center"
                        type="submit"
                    >
                        تغيير كلمة السر
                    </button>
                </div>
            </div>
        </div>
    )
}
