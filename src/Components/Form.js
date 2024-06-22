import { useState } from "react";
import './Form.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import isURL from "validator/lib/isURL";

function Form() {
    // storing input data
    const [formData, setFormData] = useState({
        name: "", email: "", phoneNo: "", position: "", numOfExp: "0",
        portfolio: "", managementExp: "", javascript: "", css: "", python: "",
        etc: "", dateAndTime: ""
    })

    const [showData, setShowData] = useState(false);
    const [showExp, setShowExp] = useState(false);
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [manageExp, setManageExp] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [dateTime, setDateTime] = useState('');

    const changeHandler = (event) => {

        if (event.target.name === "numOfExp" && event.target.value < 1) {
            return;
        }

        if (event.target.name === "position") {
            if (event.target.value === "None") {
                setShowExp(false);
                setShowPortfolio(false);
                setManageExp(false);
            }
            if (event.target.value === "Developer" || event.target.value === "Designer") {
                setShowExp(true);
                setShowPortfolio(false);
                setManageExp(false);
            }
            if (event.target.value === "Designer") {
                setShowPortfolio(true);
                setManageExp(false);
            }

            if (event.target.value === "Manager") {
                setManageExp(true);
                setShowPortfolio(false);
                setShowExp(false);
            }
        }

        // storing input data with the previous data
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    // form submit handler
    const submitHandler = (event) => {
        event.preventDefault();
        if (mobileNo.length < 11) {
            return alert("Please enter 10 digit phone number");
        }
        formData.phoneNo = mobileNo;
        if (formData.javascript == '' && formData.css == '' && formData.python == '' && formData.etc == '') {
            return alert("At least one skill must be selected");
        }
        formData.dateAndTime = dateTime;

        if (showPortfolio && formData.portfolio.length > 0) {
            if (!isURL(formData.portfolio)) {
                return alert("Enter a valid URL");
            }
        }

        // showData will true then all data will visible
        setShowData(true);
        console.log(formData);
    }

    return (
        <div className="lg:w-[60%] md:w-[60%] w-full shadow-lg mx-auto">
            {/* heading */}
            <p className="text-center my-3 font-bold text-2xl">
                Job Application Form
            </p>

            {/* ternary operator for tracking, data will display or not. 
When form will submit then showData will be true and the data will 
display otherwise form will display*/}
            {
                showData ? <></> :
                    <div className="w-full p-4">
                        {/* form */}
                        <form onSubmit={submitHandler}>

                            {/* Full Name field */}
                            <label for="name" className="text-lg mb-2">Full Name
                                <span className="text-lg text-red-600 "> *</span>
                            </label>
                            <input required type="text" placeholder="Name" name="name" id="name" onChange={changeHandler}
                                className="w-full p-2 border-2 mb-3 rounded-md"
                            />

                            {/* Email field */}
                            <label for="email" className="text-lg mb-2">Email
                                <span className="text-lg text-red-600 "> *</span>
                            </label>
                            <input required type="email" placeholder="Email" name="email" id="email" onChange={changeHandler}
                                className="w-full p-2 rounded-md border-2"
                            />

                            {/* phone number field */}
                            <label for="age" className="text-lg mb-2">Phone Number
                                <span className="text-lg text-red-600"> *</span>
                            </label>

                            <PhoneInput required country={'in'} placeholder="Mobile Number" countryCodeEditable={false} onChange={(value) => setMobileNo(value)}
                                className="mb-2"
                            />

                            {/* Applying for Position field */}
                            <label className="text-lg mb-2">Applying for Position </label>
                            {/* option */}
                            <select for="position" name="position" value={formData.position} onChange={changeHandler}
                                className="border-2 ml-2 rounded-md">
                                <option value="None">Select</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Manager">Manager</option>
                            </select>

                            {/* Relevant Experience */}
                            {
                                showExp ?
                                    <div>
                                        <label className="text-lg mb-2">Relevant Experience </label>
                                        <input required type="number" placeholder="Number of years" name="numOfExp" id="numOfExp" min={1} onChange={changeHandler} className="w-full p-2 border-2 rounded-md appearance-none m-0" />
                                    </div> : <></>
                            }

                            {/* portfolio field */}
                            {
                                showPortfolio ?
                                    <div>
                                        <label className="text-lg mb-2">Portfolio URL</label>
                                        <input required type="text" placeholder="Portfolio URL" name="portfolio" id="portfolio" onChange={changeHandler} className="w-full p-2 border-2 rounded-md appearance-none m-0" />
                                    </div> : <></>
                            }

                            {/* management experience */}
                            {
                                manageExp ?
                                    <div>
                                        <label className="text-lg mb-2">Management Experience</label>
                                        <input required type="text" placeholder="Management Experience" name="managementExp" id="managementExp" onChange={changeHandler} className="w-full p-2 border-2 rounded-md appearance-none m-0" />
                                    </div> : <></>
                            }

                            {/* Additional skills */}
                            <div className="flex mt-2 gap-x-4 flex-col lg:flex-row md-flex-row">
                                <p className="text-lg mb-2"> Additional Skills: </p>
                                {/* checkboxes */}

                                {/* javascript */}
                                <div classname="">
                                    <label className="text-lg mb-2">JavaScript</label>
                                    <input type="checkbox" name="javascript" value="JavaScript" onChange={changeHandler} className="m-2" />
                                </div>

                                {/* css */}
                                <div classname="flex gap-x-2">
                                    <label className="text-lg mb-2">CSS</label>
                                    <input type="checkbox" value="CSS" name="css" onChange={changeHandler} className="m-2" />
                                </div>

                                {/* python */}
                                <div classname="flex gap-x-2">
                                    <label className="text-lg mb-2">Python</label>
                                    <input type="checkbox" value="Python" name="python" onChange={changeHandler} className="m-2" />
                                </div>

                                {/* etc */}
                                <div classname="flex gap-x-2">
                                    <label className="text-lg mb-2">etc</label>
                                    <input
                                        type="checkbox" value="etc" name="etc" onChange={changeHandler} className="m-2" />
                                </div>
                            </div>

                            {/* date and picker */}
                            <div className="flex gap-x-4 flex-col lg:flex-row md-flex-row">
                                <p className="text-lg mb-2">Preferred Interview Time: </p>
                                <DateTimePicker required value={dateTime} onChange={(value) => setDateTime(value)} />
                            </div>

                            {/* submit button */}
                            <button className="my-3 px-3 py-2 bg-[#4ea1e9] rounded-md text-white tracking-wider hover:bg-blue-500 transition-all duration-300 ease-out">
                                Submit
                            </button>
                        </form>
                    </div>
            }

            {/* when form will submit then showData will be true and then 
data will display */}
            {
                showData ?
                    <div className="text-lg mb-2 p-4">
                        {/* name */}
                        <div className="text-lg mb-2 flex flex-col md:flex-row lg:flex-row gap-x-3">
                            <p className="font-bold">Name: </p>
                            <p>{formData.name}</p>
                        </div>

                        {/* email */}
                        <div className="text-lg mb-2 flex flex-col md:flex-row lg:flex-row gap-x-3">
                            <p className="font-bold">Email: </p>
                            <p>{formData.email}</p>
                        </div>

                        {/* Phone number */}
                        <div className="text-lg mb-2 flex flex-col lg:flex-row md:flex-row gap-x-3">
                            <p className="font-bold">Phone Number: </p>
                            <p>+{formData.phoneNo}</p>
                        </div>

                        {/* Relevant Experience */}
                        {
                            showExp ?
                                <div className="text-lg mb-2 flex flex-col lg:flex-row md:flex-row gap-x-3">
                                    <p className="font-bold">Relevant Experience: </p>
                                    <p>{formData.numOfExp}</p>
                                </div> : <></>
                        }

                        {/* Portfolio URL */}
                        {
                            showPortfolio ?
                                <div className="text-lg mb-2 flex flex-col lg:flex-row md:flex-row gap-x-3">
                                    <p className="font-bold">Portfolio URL: </p>
                                    <p>{formData.portfolio}</p>
                                </div> : <></>
                        }

                        {/* Management Experience */}
                        {
                            manageExp ?
                                <div className="text-lg mb-2 flex flex-col lg:flex-row md-flex-row gap-x-3">
                                    <p className="font-bold">Management Experience: </p>
                                    <p>{formData.managementExp}</p>
                                </div> : <></>
                        }

                        {/* Additional Skills */}
                        <div className="text-lg mb-2 flex flex-col lg:flex-row md:flex-row gap-x-3">
                            <p className="font-bold">Additional Skills: </p>
                            <div className="flex flex-col lg:flex-row md:flex-row gap-x-2">
                                <p>{formData.javascript}</p>
                                <p>{formData.css}</p>
                                <p>{formData.python}</p>
                                <p>{formData.etc}</p>
                            </div>
                        </div>

                        {/* Preferred Interview Time */}
                        <div className="text-lg mb-2 flex flex-col lg:flex-row md:flex-row gap-x-3">
                            <p className="font-bold">Preferred Interview Time: </p>
                            <p>{formData.dateAndTime.toString().substring(0, 25)}</p>
                        </div>

                    </div> : <></>
            }
        </div>
    )
}
export default Form;