import React from "react";
import "./PassengerCard.scss";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { useNavigate } from "react-router-dom";

import { getCurrencySymbol } from "../Helper/ComponentHelper/ManageStorage/localStorageUtils";

const DSRSummary = ({ customerData }) => {
   const currencySymbol = getCurrencySymbol()
  return (
    <div className="f1wrapofcreq" id="dsr_summary_x023">
      {/* dsr summary svg's */}
      <div className="dsr_x012">
        <p className="dsr_x012_p">DSR Summary</p>
        <div className="dsr_svg">
          <div className="dsr_x012_svg dsr_x012_svg_1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="52"
              viewBox="0 0 16 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_947)">
                <path
                  d="M0.191986 41.5615C8.78149 36.3106 11.4879 25.0907 6.237 16.5012C0.986073 7.91173 -10.2338 5.20529 -18.8233 10.4562C-27.4128 15.7071 -30.1193 26.927 -24.8683 35.5165C-19.6174 44.106 -8.39751 46.8125 0.191986 41.5615Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_947">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-34.376 19.9639) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="dsr_x012_svg dsr_x012_svg_2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="52"
              viewBox="0 0 16 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_947)">
                <path
                  d="M0.191986 41.5615C8.78149 36.3106 11.4879 25.0907 6.237 16.5012C0.986073 7.91173 -10.2338 5.20529 -18.8233 10.4562C-27.4128 15.7071 -30.1193 26.927 -24.8683 35.5165C-19.6174 44.106 -8.39751 46.8125 0.191986 41.5615Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_947">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-34.376 19.9639) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="dsr_x012_svg dsr_x012_svg_3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="52"
              viewBox="0 0 16 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_947)">
                <path
                  d="M0.191986 41.5615C8.78149 36.3106 11.4879 25.0907 6.237 16.5012C0.986073 7.91173 -10.2338 5.20529 -18.8233 10.4562C-27.4128 15.7071 -30.1193 26.927 -24.8683 35.5165C-19.6174 44.106 -8.39751 46.8125 0.191986 41.5615Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_947">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-34.376 19.9639) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="dsr_x012_svg dsr_x012_svg_4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="52"
              viewBox="0 0 16 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_947)">
                <path
                  d="M0.191986 41.5615C8.78149 36.3106 11.4879 25.0907 6.237 16.5012C0.986073 7.91173 -10.2338 5.20529 -18.8233 10.4562C-27.4128 15.7071 -30.1193 26.927 -24.8683 35.5165C-19.6174 44.106 -8.39751 46.8125 0.191986 41.5615Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_947">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-34.376 19.9639) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="52"
              viewBox="0 0 16 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_947)">
                <path
                  d="M0.191986 41.5615C8.78149 36.3106 11.4879 25.0907 6.237 16.5012C0.986073 7.91173 -10.2338 5.20529 -18.8233 10.4562C-27.4128 15.7071 -30.1193 26.927 -24.8683 35.5165C-19.6174 44.106 -8.39751 46.8125 0.191986 41.5615Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_947">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-34.376 19.9639) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="dsr_x012_svg dsr_x012_svg_5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="52"
              viewBox="0 0 16 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_947)">
                <path
                  d="M0.191986 41.5615C8.78149 36.3106 11.4879 25.0907 6.237 16.5012C0.986073 7.91173 -10.2338 5.20529 -18.8233 10.4562C-27.4128 15.7071 -30.1193 26.927 -24.8683 35.5165C-19.6174 44.106 -8.39751 46.8125 0.191986 41.5615Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_947">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-34.376 19.9639) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="52"
              viewBox="0 0 47 52"
              fill="none"
            >
              <g clip-path="url(#clip0_17_950)">
                <path
                  d="M31.2994 41.5449C27.1746 44.0665 22.217 44.8463 17.5173 43.7126C12.8176 42.5789 8.76068 39.6248 6.23909 35.4999L-3.26855 19.9473L27.8368 0.931968L37.3444 16.4846C39.866 20.6095 40.6457 25.567 39.5121 30.2668C38.3784 34.9665 35.4242 39.0234 31.2994 41.5449Z"
                  fill="#F7B801"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_950">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(-3.26855 19.9473) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="33"
              viewBox="0 0 51 33"
              fill="none"
            >
              <g clip-path="url(#clip0_17_959)">
                <path
                  d="M35.4078 22.5283C43.9973 17.2774 46.7038 6.05753 41.4528 -2.53197C36.2019 -11.1215 24.982 -13.8279 16.3925 -8.57698C7.80301 -3.32606 5.09656 7.89383 10.3475 16.4833C15.5984 25.0728 26.8183 27.7793 35.4078 22.5283Z"
                  fill="#3D348B"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_959">
                  <rect
                    width="36.4571"
                    height="36.4571"
                    fill="white"
                    transform="translate(0.839844 0.930664) rotate(-31.4383)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* dsr summary user pic and details */}
      <div className="user_detail_003">
        <div className="user_pic_dsr_x093">
          <div className="user_pic_border_dsr_x093">
            <img src="/Icons/Base.png" alt="" />

            <div className="user_detail_x001">
              <h3>{customerData?.customer?.display_name || ""}</h3>
              <p>{customerData?.customer?.email || ""}</p>
            </div>
          </div>
        </div>

        <div className="user_detail_id_x002">
          <p
            className={
              customerData?.is_invoiced == "0"
                ? "draft"
                : customerData?.is_invoiced == "1"
                ? "invoiced2"
                : ""
            }
            style={{
              cursor: "pointer",
              padding: "5px 12px",
              marginTop: "-32px",
              marginBottom: "10px",
            }}
          >
            {customerData?.is_invoiced == "1"
              ? "Invoiced"
              : customerData?.is_invoiced == "0"
              ? "Not Invoiced"
              : ""}
          </p>
          <p>{customerData?.dsr_no || ""}</p>
        </div>
      </div>

      <div className="other_user_detils_z01">
        {/* dsr summary user other details */}

        <div className="other_user_detils_z03">
          <div className="x001">
            <p className="x002">{otherIcons?.mobile_svg} Mobile</p>
            <p className="x1002">{customerData?.customer?.mobile_no}</p>
          </div>
          <div className="x001">
            <p className="x002">{otherIcons?.email_svg} Email</p>
            <p className="x1002">{customerData?.customer?.email}</p>
          </div>
          <div className="x001">
            <p className="x002">{otherIcons?.quotation_icon} Customer Type</p>
            <p className="x1002">{customerData?.customer?.customer_type}</p>
          </div>
          <div className="x001">
            <p className="x002"> Currency</p>
            <p className="x1002">{customerData?.currency}</p>
          </div>
          {/* {customerData?.passengers?.map((item, index) => (
              <div className="x001" key={index}>
                
                <p className="x002"> Service Total</p>
                <p className="x1002">{item?.service_total || 0}</p>
               
              </div>
            ))} */}
        </div>

        {/* dsr summary user passangers details */}
      </div>
      <div className="other_passangers_detils_z01">
        <div className="other_passangers_detils_z03">
          {/* {customerData?.passengers?.map((item, index) => ( */}
          <div className="add_passangers_001">
            <h3>Service Total:</h3>

            <h3>({currencySymbol}) {customerData?.passengers
                ?.reduce(
                  (acc, item) => acc + parseFloat(item?.service_total || 0),
                  0
                )
                .toFixed(2)} 
            </h3>
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default DSRSummary;
