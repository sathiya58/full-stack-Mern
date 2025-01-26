import { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available,
            };

            const { data } = await axios.post(
                `${backendUrl}/api/doctor/update-profile`,
                updateData,
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }

            setIsEdit(false);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken, getProfileData]);

    return profileData && (
        <div>
            <div className="flex flex-col gap-4 m-5">
                <div>
                    <img
                        className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
                        src={profileData.image}
                        alt={profileData.name || 'Doctor Image'}
                    />
                </div>

                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                    {/* Doctor Info */}
                    <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                        {profileData.name || 'No Name'}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <p>
                            {profileData.degree || 'N/A'} - {profileData.speciality || 'N/A'}
                        </p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">
                            {profileData.experience || 'N/A'}
                        </button>
                    </div>

                    {/* About Section */}
                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                            About:
                        </p>
                        <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                            {isEdit ? (
                                <textarea
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            about: e.target.value,
                                        }))
                                    }
                                    className="w-full outline-primary p-2"
                                    rows={8}
                                    value={profileData.about || ''}
                                />
                            ) : (
                                profileData.about || 'No description available'
                            )}
                        </p>
                    </div>

                    {/* Fee Section */}
                    <p className="text-gray-600 font-medium mt-4">
                        Appointment fee:{' '}
                        <span className="text-gray-800">
                            {currency}{' '}
                            {isEdit ? (
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            fees: e.target.value,
                                        }))
                                    }
                                    value={profileData.fees || ''}
                                />
                            ) : (
                                profileData.fees || '0'
                            )}
                        </span>
                    </p>

                    {/* Address Section */}
                    <div className="flex gap-2 py-2">
                        <p>Address:</p>
                        <p className="text-sm">
                            {isEdit ? (
                                <>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line1: e.target.value,
                                                },
                                            }))
                                        }
                                        value={profileData.address?.line1 || ''}
                                        placeholder="Address Line 1"
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value,
                                                },
                                            }))
                                        }
                                        value={profileData.address?.line2 || ''}
                                        placeholder="Address Line 2"
                                    />
                                </>
                            ) : (
                                <>
                                    {profileData.address?.line1 || 'N/A'}
                                    <br />
                                    {profileData.address?.line2 || 'N/A'}
                                </>
                            )}
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="flex gap-1 pt-2">
                        <input
                            type="checkbox"
                            onChange={() =>
                                isEdit &&
                                setProfileData((prev) => ({
                                    ...prev,
                                    available: !prev.available,
                                }))
                            }
                            checked={profileData.available || false}
                        />
                        <label>Available</label>
                    </div>

                    {/* Buttons */}
                    {isEdit ? (
                        <button
                            onClick={updateProfile}
                            className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit((prev) => !prev)}
                            className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
