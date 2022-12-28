import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

let swear = [
    "arse",
    "ass",
    "asshole",
    "bastard",
    "bitch",
    "bollocks",
    "bugger",
    "bullshit",
    "crap",
    "damn",
    "frigger",
];

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
    const [foundBadWord, setfoundBadWord] = useState(false);
    // const [toggle, setToggle] = useState(false);
    const [nameToggle, setNameToggle] = useState(false);
    const [emailToggle, setEmailToggle] = useState(false);
    const [numberToggle, setNumberToggle] = useState(false);
    const [messageToggle, setMessageToggle] = useState(false);
    const [badwordToggle, setBadwordToggle] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

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

    // const toggleHandler = () => {
    //     setToggle(!toggle);
    // };

    const nameRuleToggle = () => {
        setNameToggle(!nameToggle);
        setEmailToggle(false);
        setNumberToggle(false);
        setMessageToggle(false);
        setBadwordToggle(false);
    };

    const emailRuleToggle = () => {
        setNameToggle(false);
        setEmailToggle(!emailToggle);
        setNumberToggle(false);
        setMessageToggle(false);
        setBadwordToggle(false);
    };

    const numberRuleToggle = () => {
        setNameToggle(false);
        setEmailToggle(false);
        setNumberToggle(!numberToggle);
        setMessageToggle(false);
        setBadwordToggle(false);
    };

    const messageRuleToggle = () => {
        setNameToggle(false);
        setEmailToggle(false);
        setNumberToggle(false);
        setMessageToggle(!messageToggle);
        setBadwordToggle(false);
    };

    const badwordToggleHandler = () => {
        setNameToggle(false);
        setEmailToggle(false);
        setNumberToggle(false);
        setMessageToggle(false);
        setBadwordToggle(!badwordToggle);
    };

    const handleBadWords = (e) => {
        let flag = 0;
        const input = e.target.value.trim().split(" ");

        for (let i = 0; i < swear.length; i++) {
            for (let j = 0; j < input.length; j++) {
                if (swear[i] === input[j]) {
                    setfoundBadWord(true);
                    flag = 1;
                    break;
                }
            }
        }
        if (flag === 0) {
            setfoundBadWord(false);
        }

        // if (badWord.length > 0) {
        //     setfoundBadWord(true);
        // } else {
        //     setfoundBadWord(false);
        // }
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
                        className="p-2 border rounded-lg focus:outline-blue-500"
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
                        // onKeyUp={() => {
                        //     trigger("name");
                        // }}
                    />

                    {errors.name && (
                        <div className="flex relative items-center justify-between">
                            <p className="text-xs font-light text-red-700">
                                {errors.name.message}
                            </p>
                            <button
                                className="text-xs underline"
                                onClick={nameRuleToggle}
                            >
                                Rules
                            </button>
                            {nameToggle ? (
                                <div className="absolute left-64 bottom-5 w-56 text-xs text-slate-600 bg-white p-2 border rounded-md">
                                    <p
                                        className="text-lg cursor-pointer flex justify-end"
                                        onClick={nameRuleToggle}
                                    >
                                        &times;
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Name
                                        </span>{" "}
                                        - must be string, can not have numbers,
                                        can be maximum 30 characters.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Email
                                        </span>{" "}
                                        - must be string, the structure of the
                                        input must match valid email structure,
                                        i.e. user@address.com.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Phone
                                        </span>{" "}
                                        - must be string,
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Message
                                        </span>{" "}
                                        - must be string, at least 80
                                        characters.
                                    </p>
                                </div>
                            ) : null}
                        </div>
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
                                // eslint-disable-next-line
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[com|info]{2,4}))$/,
                                message: "Invaid Email",
                            },
                        })}
                        // onKeyUp={() => {
                        //     trigger("email");
                        // }}
                    />

                    {errors.email && (
                        <div className="flex relative items-center justify-between">
                            <p className="text-xs font-light text-red-700">
                                {errors.email.message}
                            </p>
                            <button
                                className="text-xs underline"
                                onClick={emailRuleToggle}
                            >
                                Rules
                            </button>
                            {emailToggle ? (
                                <div className="absolute left-64 bottom-5 w-56 text-xs text-slate-600 bg-white p-2 border rounded-md">
                                    <p
                                        className="text-lg cursor-pointer flex justify-end"
                                        onClick={emailRuleToggle}
                                    >
                                        &times;
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Name
                                        </span>{" "}
                                        - must be string, can not have numbers,
                                        can be maximum 30 characters.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Email
                                        </span>{" "}
                                        - must be string, the structure of the
                                        input must match valid email structure,
                                        i.e. user@address.com.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Phone
                                        </span>{" "}
                                        - must be string,
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Message
                                        </span>{" "}
                                        - must be string, at least 80
                                        characters.
                                    </p>
                                </div>
                            ) : null}
                        </div>
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
                        // onKeyUp={() => {
                        //     trigger("phone");
                        // }}
                    />

                    {errors.number && (
                        <div className="flex relative items-center justify-between">
                            <p className="text-xs font-light text-red-700">
                                {errors.number.message}
                            </p>
                            <button
                                className="text-xs underline"
                                onClick={numberRuleToggle}
                            >
                                Rules
                            </button>
                            {numberToggle ? (
                                <div className="absolute left-64 bottom-5 w-56 text-xs text-slate-600 bg-white p-2 border rounded-md">
                                    <p
                                        className="text-lg cursor-pointer flex justify-end"
                                        onClick={numberRuleToggle}
                                    >
                                        &times;
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Name
                                        </span>{" "}
                                        - must be string, can not have numbers,
                                        can be maximum 30 characters.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Email
                                        </span>{" "}
                                        - must be string, the structure of the
                                        input must match valid email structure,
                                        i.e. user@address.com.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Phone
                                        </span>{" "}
                                        - must be string,
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Message
                                        </span>{" "}
                                        - must be string, at least 80
                                        characters.
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="p-2 flex flex-col">
                    <label className="pb-1 text-sm">Message</label>
                    <textarea
                        className="p-2 border rounded-lg  focus:outline-blue-500 h-28"
                        type="text"
                        // value={text}
                        // onChange={(e) => console.log(e.target.value)}
                        {...register("message", {
                            required: "Message is Required",
                            minLength: {
                                value: 80,
                                message: "Minimum Required length is 80",
                            },

                            onChange: (e) => handleBadWords(e),
                        })}
                        // onKeyUp={() => {
                        //     trigger("message");
                        // }}
                    />
                    {foundBadWord ? (
                        <div className="flex relative items-center justify-between">
                            <p className="text-xs font-light text-red-700">
                                Bad words found!
                            </p>
                            <button
                                className="text-xs underline"
                                onClick={messageRuleToggle}
                            >
                                Rules
                            </button>
                            {messageToggle ? (
                                <div className="absolute left-64 bottom-5 w-56 text-xs text-slate-600 bg-white p-2 border rounded-md">
                                    <p
                                        className="text-lg cursor-pointer flex justify-end"
                                        onClick={messageRuleToggle}
                                    >
                                        &times;
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Name
                                        </span>{" "}
                                        - must be string, can not have numbers,
                                        can be maximum 30 characters.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Email
                                        </span>{" "}
                                        - must be string, the structure of the
                                        input must match valid email structure,
                                        i.e. user@address.com.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Phone
                                        </span>{" "}
                                        - must be string,
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Message
                                        </span>{" "}
                                        - must be string, at least 80
                                        characters.
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    {errors.message && (
                        <div className="flex relative items-center justify-between">
                            <p className="text-xs font-light text-red-700">
                                {errors.message.message}
                            </p>
                            <button
                                className="text-xs underline"
                                onClick={badwordToggleHandler}
                            >
                                Rules
                            </button>
                            {badwordToggle ? (
                                <div className="absolute left-64 bottom-5 w-56 text-xs text-slate-600 bg-white p-2 border rounded-md">
                                    <p
                                        className="text-lg cursor-pointer flex justify-end"
                                        onClick={badwordToggleHandler}
                                    >
                                        &times;
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Name
                                        </span>{" "}
                                        - must be string, can not have numbers,
                                        can be maximum 30 characters.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Email
                                        </span>{" "}
                                        - must be string, the structure of the
                                        input must match valid email structure,
                                        i.e. user@address.com.
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Phone
                                        </span>{" "}
                                        - must be string,
                                    </p>
                                    <p className="pb-1">
                                        <span className="font-bold text-blue-600">
                                            Message
                                        </span>{" "}
                                        - must be string, at least 80
                                        characters.
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
                {foundBadWord ? (
                    <input
                        className="mt-5 bg-slate-400 rounded-full p-2 text-white "
                        type="button"
                        // onClick={ openModal }
                        value="Submit"
                        disabled
                    />
                ) : (
                    <input
                        className={`mt-5 ${
                            isValid ? "bg-blue-600" : "bg-slate-400"
                        } rounded-full p-2 text-white`}
                        type="submit"
                        // onClick={ openModal }
                        value="Submit"
                        // disabled={!isDirty || !isValid}
                    />
                )}
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
