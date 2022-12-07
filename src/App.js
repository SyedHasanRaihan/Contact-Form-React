import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };
    return (
        <div className="flex w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 justify-center items-center">
            <form
                className="flex flex-col bg-white p-10 rounded-xl shadow-2xl"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Name</label>
                    <input
                        className="p-2 border rounded-lg focus:outline-blue-500 "
                        placeholder="Name"
                        type="text"
                        {...register("name", { required: true, maxLength: 30 })}
                    />

                    {errors.name && <p className="text-xs font-light text-red-700">Please enter a valid name</p>}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Email</label>
                    <input
                        className="p-2 border rounded-lg  focus:outline-blue-500"
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />

                    {errors.email && <p className="text-xs font-light text-red-700">Please enter a valid email</p>}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Phone Number</label>
                    <input
                        className="p-2 border rounded-lg  focus:outline-blue-500"
                        placeholder="Phone"
                        type="number"
                        {...register("number", {
                            required: true,
                            pattern: /^(?:\+88|01)?\d{11}\r?$/,
                        })}
                    />

                    {errors.number && <p className="text-xs font-light text-red-700">Please enter a valid Phone number</p>}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Message</label>
                    <textarea
                        className="p-2 border rounded-lg  focus:outline-blue-500 h-28"
                        type="text"
                        {...register("message", {
                            maxLength: 80,
                        })}
                    />

                    {errors.message && <p className="text-xs font-light text-red-700">Keep between 80 characters And avoid Bad Words</p>}
                </div>
                <button className="mt-5 bg-blue-600 rounded-full p-2 text-white " type="submit">Submit</button>
            </form>
        </div>
    );
}
