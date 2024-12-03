import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReusableSwitch = ({ switchValue, setSwitchValue, handleStatusChange, labelOff, labelOn, statusKey, itemId, confirmText, successMessageOn, successMessageOff }) => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleSwitchChange = async (e) => {

        let confirmed = null;
        if (confirmed === null) {
            const result = await Swal.fire({
                text: `Do you want to ${switchValue == "1" ? labelOff : labelOn} this customer ?`,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            });
            confirmed = result.isConfirmed;
        }
        const newValue = e.target.value;

        if (confirmed && itemId) {
            setSwitchValue(newValue);
            const sendData = {
                user_id: itemId,
                [statusKey]: newValue
            };

            dispatch(handleStatusChange(sendData))
                .then(() => {
                    const toastMessage = newValue == '1' ? successMessageOn : successMessageOff;
                    toast.success(toastMessage);
                    Navigate("/dashboard/customers");
                })
                .catch((error) => {
                    toast.error('Failed to update item status');
                    console.error('Error updating item status:', error);
                    // Revert switch value if there's an error
                    setSwitchValue((prevValue) => prevValue == '1' ? '0' : '1');
                });
        }
    };

    return (
        <div className="switchbuttontext">
            <div className="switches-container">
                <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue == "0"} onChange={handleSwitchChange} />
                <input type="radio" id="switchYearly" name="switchPlan" className="newinput" value="1" checked={switchValue == "1"} onChange={handleSwitchChange} />
                <label htmlFor="switchMonthly">{labelOff}</label>
                <label htmlFor="switchYearly">{labelOn}</label>
                <div className="switch-wrapper">
                    <div className="switch">
                        <div id="inactiveid">{labelOff}</div>
                        <div>{labelOn}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReusableSwitch;
