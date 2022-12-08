import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        // height:"100px",
        width: "400px",
        // height: "400px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "lightgray",
    },
};

export default function App() {
    const [data, setData] = useState("");

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setData(data);
        openModal();
        reset();
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "#fff";
    }

    function closeModal() {
        setIsOpen(false);
    }

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
                        {...register("name", {
                            required: "Name is Required",
                            minLength: {
                                value: 3,
                                message: "Minimum Required length is 3",
                            },
                            maxLength: {
                                value: 30,
                                message: "Maximum allowed length is 30",
                            },
                            pattern: {
                                value: /^[\p{L} ,.'-]+$/u,
                                message: "Only (a-z) are allowed",
                            },
                        })}
                        onKeyUp={() => {
                            trigger("name");
                        }}
                    />

                    {errors.name && (
                        <p className="text-xs font-light text-red-700">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Email</label>
                    <input
                        className="p-2 border rounded-lg  focus:outline-blue-500"
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                            required: "Email is Required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invaid Email",
                            },
                        })}
                        onKeyUp={() => {
                            trigger("email");
                        }}
                    />

                    {errors.email && (
                        <p className="text-xs font-light text-red-700">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Phone Number</label>
                    <input
                        className="p-2 border rounded-lg  focus:outline-blue-500"
                        placeholder="Phone"
                        type="number"
                        {...register("number", {
                            required: "number is Required",
                            pattern: {
                                value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                                message: "Invalid number",
                            },
                        })}
                        onKeyUp={() => {
                            trigger("phone");
                        }}
                    />

                    {errors.number && (
                        <p className="text-xs font-light text-red-700">
                            {errors.number.message}
                        </p>
                    )}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Message</label>
                    <textarea
                        className="p-2 border rounded-lg  focus:outline-blue-500 h-28"
                        type="text"
                        {...register("message", {
                            required: "Message is Required",
                            minLength: {
                                value: 0,
                                message: "Minimum Required length is 0",
                            },
                            maxLength: {
                                value: 80,
                                message: "Maximum allowed length is 80 ",
                            },
                        })}
                        onKeyUp={() => {
                            trigger("message");
                        }}
                    />

                    {errors.message && (
                        <p className="text-xs font-light text-red-700">
                            {errors.message.message}
                        </p>
                    )}
                </div>
                <input
                    className="mt-5 bg-blue-600 rounded-full p-2 text-white "
                    type="submit"
                    // onClick={ openModal }
                    value="Submit"
                />
            </form>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {data.name && (
                        <div className="relative flex justify-center items-center overflow-hidden">
                            <h1 className="">
                                Thank you{" "}
                                <span className="font-bold text-indigo-600 text-xl">
                                    {data.name}
                                </span>
                                !
                            </h1>{" "}
                            <button
                                className="text-red-600 text-4xl absolute -top-4 right-0"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}
