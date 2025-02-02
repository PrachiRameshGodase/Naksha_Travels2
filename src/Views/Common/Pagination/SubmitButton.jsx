import React from "react";
import { Link } from "react-router-dom";
import CancelButton from "../../Helper/ComponentHelper/CancelButtonWarning";

const SubmitButton = ({ isEdit, itemId, cancel }) => {
  return (
    <div className="actionbarcommon">
      {isEdit && itemId ? (
        <>
          <button
            className={`firstbtnc46x5s firstbtnc2`}
            type="submit"
            name="saveAsDraft"
          >
            Update
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {cancel !== "invoices" && (
            <button className={`firstbtnc1`} type="submit" name="saveAndSend">
              {" "}
              Update and send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={18}
                height={18}
                color={"#525252"}
                fill={"none"}
              >
                <path
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className={`firstbtnc46x5s firstbtnc2`}
            type="submit"
            name="saveAsDraft"
          >
            Save as draft
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {cancel !== "invoices" && (
            <button className={`firstbtnc1`} type="submit" name="saveAndSend">
              Save and Send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={18}
                height={18}
                color={"#525252"}
                fill={"none"}
              >
                <path
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      )}

      <CancelButton cancelPath={cancel} />
    </div>
  );
};

export default SubmitButton;

export const SubmitButton2 = ({ isEdit, itemId, cancel }) => {
  return (
    <div className="actionbarcommon">
      {isEdit && itemId ? (
        <>
          <button className={`firstbtnc1`} type="submit" name="saveAsDraft">
            Update
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <button className={`firstbtnc1`} type="submit" name="saveAsDraft">
            Save
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      <Link to={`/dashboard/${cancel}`} className="firstbtnc2">
        Cancel
      </Link>
    </div>
  );
};

export const SubmitButton3 = ({ isEdit, itemId, cancel }) => {
  return (
    <div className="actionbarcommon">
      {isEdit && itemId ? (
        <>
          <button
            className={`firstbtnc46x5s firstbtnc2`}
            type="submit"
            name="saveAsDraft"
          >
            Update
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className={`firstbtnc1`} type="submit" name="saveAndOpen">
            {" "}
            Update and Open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <button
            className={`firstbtnc46x5s firstbtnc2`}
            type="submit"
            name="saveAsDraft"
          >
            Save as draft
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className={`firstbtnc1`} type="submit" name="saveAndOpen">
            Save and Open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      <Link to={"/dashboard/bills"} className="firstbtnc2">
        Cancel
      </Link>
    </div>
  );
};

export const SubmitButton4 = ({ isEdit, itemId, cancel }) => {
  return (
    <div className="actionbarcommon">
      {isEdit && itemId ? (
        <>
          <button
            className={`firstbtnc46x5s firstbtnc2`}
            type="submit"
            name="saveAsDraft"
          >
            Update
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {cancel !== "invoices" && (
            <button className={`firstbtnc1`} type="submit" name="saveAndSend">
              {" "}
              Update and send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={18}
                height={18}
                color={"#525252"}
                fill={"none"}
              >
                <path
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className={`firstbtnc46x5s firstbtnc2`}
            type="submit"
            name="saveAsDraft"
          >
            Save as draft
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {cancel !== "invoices" && (
            <button className={`firstbtnc1`} type="submit" name="saveAndSend">
              Convert To Invoice
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={18}
                height={18}
                color={"#525252"}
                fill={"none"}
              >
                <path
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      )}

      <CancelButton cancelPath={cancel} />
    </div>
  );
};

export const SubmitButton5 = ({ isEdit, itemId, onClick, cancel }) => {
  return (
    <div className="actionbarcommon">
      {isEdit && itemId ? (
        <>
          <button className={`firstbtnc1`} type="submit" name="saveAsDraft">
            Update
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <button className={`firstbtnc1`} onClick={onClick}>
            Save
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              color={"#525252"}
              fill={"none"}
            >
              <path
                d="M20 12L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      <Link to={`/dashboard/${cancel}`} className="firstbtnc2">
        Cancel
      </Link>
    </div>
  );
};

export const SubmitButton6 = ({ onClick, createUpdate, setShowModal,isEdit }) => {
  return (
    <div className="actionbarcommon">
      {isEdit  ? (
        <>
          <button className={`firstbtnc1 ${createUpdate?.loading ? "disabledbtn" : ""} `} onClick={onClick}>
          {createUpdate?.loading ? "Update" : "Update"}
          </button>
        </>
      ) : (
        <>
      <button
        // className={`firstbtnc1`}
        className={`firstbtnc1 ${createUpdate?.loading ? "disabledbtn" : ""} `}
        onClick={onClick}
        disabled={createUpdate?.loading}
      >
        {createUpdate?.loading ? "Save" : "Save"}
      </button>
      </>
      )}

      <button
        className={`firstbtnc2 ${createUpdate?.loading ? "disabledbtn" : ""} `}
        onClick={() => setShowModal(false)} // Close the popup
        disabled={createUpdate?.loading}
      >
        Cancel
      </button>
    </div>
  );
};

export const SubmitButton7 = ({ onClick, createUpdate, setShowPopup }) => {
  return (
    <div className="actionbarcommon">
      <button
        // className={`firstbtnc1`}
        className={`firstbtnc1 ${createUpdate?.loading ? "disabledbtn" : ""} `}
        onClick={onClick}
        disabled={createUpdate?.loading}
      >
        {createUpdate?.loading ? "Save" : "Save"}
      </button>

      <button
        className={`firstbtnc2 ${createUpdate?.loading ? "disabledbtn" : ""} `}
        onClick={() => setShowPopup(null)} // Close the popup
        disabled={createUpdate?.loading}
      >
        Cancel
      </button>
    </div>
  );
};
