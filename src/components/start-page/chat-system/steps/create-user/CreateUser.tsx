import React from "react";
import {useForm} from "react-hook-form";
import s from './create-user.module.css'

type TStepOne = {
    createUserHandler: (name: string) => void
}
export const CreateUser: React.FC<TStepOne> = React.memo((props) => {
    const {createUserHandler} = props;
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit
    } = useForm();

    const onCreateUser = (data: any) => {
        createUserHandler(data.userName);
    }

    return (
        <div className={`username-container ${s.container}`}>
            <form
                onSubmit={handleSubmit(onCreateUser)}
                style={{display: 'inline-block'}}>
                <h4 className={'username-label'}>Enter username</h4>
                <input
                    {...register('userName', {
                        required:'Please, write your name!',
                        minLength:{
                            value:3,
                            message: 'At least 3 symbols!'
                        },
                        maxLength:{
                            value:20,
                            message: 'Max 20 symbols!'
                        },
                    })}
                    className={'input'}
                />
                {errors?.userName && <p className={s.error}>{errors?.userName.message || 'Error!'}</p>}
                <input className={s.button} type="submit" value={'Send'}/>
            </form>
        </div>
    )
})