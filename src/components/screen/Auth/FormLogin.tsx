/* eslint-disable @next/next/no-img-element */
import { Input } from "antd";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { authenticate } from "~src/api";
import BaseAPI from "~src/api/methods";
import { IconFacebook, IconAvatar, IconEnvelope, LinkedIn } from "~src/assets";
import { toast } from "~src/components";
import { FormInputAuth } from "~src/components/global/FormControls/FormInputAuth";
import styles from "./Auth.module.scss";

const { put, get, post } = new BaseAPI("authenticate");

const FormLogin = () => {
  const { handleSubmit, control } = useForm<TLogin>({
    mode: "onBlur",
    defaultValues: {
      username: "admin",
      password: "123456",
    },
  });

  const { query } = useRouter();

  const _onPress = async (data: TLogin) => {
    try {
      await signIn("credentials-signin", {
        data: JSON.stringify(data),
        callbackUrl: query?.callbackUrl as string,
      });
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={clsx(
          styles.bgContent,
          "xl:w-[50%] w-[100%] xl:mx-0 mx-2 shadow h-[500px] rounded-3xl bg-[#fff] flex"
        )}
      >
        <div
          className={clsx(
            styles.bgright,
            "w-[40%] rounded-l-3xl p-4 lg:block hidden"
          )}
        >
          <div className="">
            {/* <img src="../logo.png" width={60} height={60} alt="" /> */}
            <img
              src="/loading.jpeg"
              style={{ width: 60, height: 60, borderRadius: 9999 }}
            />
          </div>
          <div className="text-center py-[100px]">
            <div>
              <p className="text-[#fff] font-semibold text-5xl">
                Wellcom back!
              </p>
              <p className="px-8 text-[#fff] text-base">
                To keep connect with us please login with your personal info
              </p>
            </div>
            <div className="py-4">
              <button className="border-[2px] border-[#fff] text-base font-semibold rounded-3xl text-[#fff] px-8 py-2">
                SIGN IN
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[60%] w-[100%] p-4">
          <div className="text-center text-4xl text-[#39b398] font-semibold py-4 pt-[68px]">
            <p>Login Account</p>
          </div>
          <div className="mb-4 flex justify-center">
            <span className="w-[32px] h-[32px] pt-1 text-center  border border-[#aaaaaa] rounded-full m-2">
              <i className="fab fa-facebook-f"></i>
            </span>
            <span className="w-[32px] h-[32px] pt-1 text-center border border-[#aaaaaa] rounded-full m-2">
              <i className="fab fa-google-plus-g"></i>
            </span>
            <span className="w-[32px] h-[32px] pt-1 text-center border border-[#aaaaaa] rounded-full m-2">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </div>
          <div>
            <div className="text-center mb-4 flex w-[60%] m-auto">
              <span className="h-12 bg-[#efefef] pt-3">
                <i className="fas fa-user h-12 text-[#737272] items-center flex px-4"></i>
              </span>
              <div className="w-full">
                <FormInputAuth
                  defaultValue="admin"
                  control={control}
                  name="username"
                  icon=""
                  placeholder="Tài khoản"
                  rules={{
                    required: "This field is required",
                  }}
                />
              </div>
            </div>
            <div className="text-center mb-4 flex w-[60%] m-auto">
              <span className="h-12 bg-[#efefef] pt-3 ">
                <i className="fas fa-lock h-12 text-[#737272] items-center flex px-4"></i>
              </span>
              <div className="w-full">
                <FormInputAuth
                  defaultValue="23312331"
                  control={control}
                  name="password"
                  icon=""
                  type="password"
                  placeholder="Mật khẩu"
                  rules={{
                    required: "This field is required",
                  }}
                />
              </div>
            </div>
            <div className="mb-4 flex justify-center">
              <input type="checkbox" />
              <p className="text-xs ml-[4px] text-[#a0a0a0] font-semibold">
                Xác nhận các điều khoản đăng nhập !
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={handleSubmit(_onPress)}
                className="bg-[#39b398] rounded-3xl text-[#fff] px-8 py-2"
              >
                SING IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
