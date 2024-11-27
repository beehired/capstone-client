"use client"

import React, { ChangeEvent, useState } from 'react'
import styles from '@/styles/dashboard/admin/user.module.scss';
import Search from '../../search';
import Pagination from '@/components/pagination';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GraphQLRequest } from '@/lib/graphQLRequest';
import { GetAllUsersByRole } from '@/util/Query/user.query';
import { Formatter } from '@/util/formatter';
import { MediumPoppins, RegularPoppins } from '@/components/typograhy';
import { TbEye, TbAlertCircleFilled, TbTrash, TbSearch } from 'react-icons/tb';
import Dialog from '@/components/dialog';
import Prompt from '@/components/prompt';
import PromptStyles from "@/styles/components/prompt.module.scss"
import { CancelBtn, PrimaryButton } from '@/components/button';
import { useFormik } from 'formik';
import { InputV1, InputV2 } from '@/components/input';
import { AdminRegister } from '@/validations/registerSchema';
import { CraeteUserAdmin, DeleteMyAdminAcc } from '@/util/Mutation/user.mutation';
import toast from 'react-hot-toast';
import ToastNotification from '@/components/notification';
import { User } from '@/types/user';
import { queryClient } from '@/lib/provider';
import { isEmpty } from 'lodash';
import NotAvailable from '@/components/notavailable';

export default function UserTemplate() {

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [toggle, setToggle] = useState<boolean>(false)
    const [onDelete, setOnDelete] = useState<boolean>(false);
    const [id, setId] = useState("");

    const itemsPerPage = 20;


    const onHandleDeleteChange = (id: string) => {
        setId(id);
        setOnDelete(() => !onDelete)
    }
    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const { data } = useQuery({
        queryKey: ["GetUserByRole", search, "admin"],
        queryFn: async () => {
            const { getAllUserAccountByRole } = await GraphQLRequest(GetAllUsersByRole, {
                role: "admin",
                search,
                input: {
                    take: itemsPerPage,
                    page: page
                }
            })

            return getAllUserAccountByRole
        }
    })

    const NextPage = () => {
        setPage(() => page + 1)
    }

    const PrevPage = () => {
        setPage(() => page - 1)
    }


    const onHandleAddUser = () => {
        setToggle(() => !toggle)
    }

    const [passwordToggle, setPasswordToggle] = useState(false)

    const mutation = useMutation({
        mutationKey: ["AdminRegister"],
        mutationFn: async (inputValues: User) => {
            return await GraphQLRequest(CraeteUserAdmin, inputValues)
        },
        onSuccess: async (data) => {

            if (data.createUserAdminAccount.userID) {
                toast.success("Successfully User Admin Added")
                queryClient.invalidateQueries({
                    queryKey: ["GetUserByRole"]
                })
                setToggle(true)
            }

            if (data.createUserAdminAccount.code) {
                toast.error(data.createUserAdminAccount.message)
            }
        }
    })
    const { handleSubmit, isSubmitting, errors, touched, values, handleChange } = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            phone: ''
        },
        validationSchema: AdminRegister,
        onSubmit: async () => {
            await mutation.mutateAsync({
                input: {
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    phone: `+63${values.phone}`,
                    password: values.password
                }
            })
        }
    })


    const onDeleteMutation = useMutation({
        mutationKey: ["DeleteUser"],
        mutationFn: async (inputValues: { userId: string }) => {
            return await GraphQLRequest(DeleteMyAdminAcc, inputValues)
        },
        onSuccess: () => {
            toast.success("Successfully User Admin Deleted")
            setOnDelete(false);
            queryClient.invalidateQueries({
                queryKey: ['GetUserByRole']
            })
        }
    })

    const formik = useFormik({
        initialValues: {},
        onSubmit: async () => {
            await onDeleteMutation.mutateAsync({
                userId: id
            })
        }
    })

    return (
        <div className={styles.container}>
            {
                toggle ?
                    <Dialog>
                        <Prompt title='Add New User'>
                            <div className={PromptStyles.inputHeader}>
                                <InputV1 name='email' onChange={handleChange} type="text" placeholder='Email Address' value={values.email} errors={errors.email} touched={touched.email} />
                                <InputV1 name='firstname' onChange={handleChange} type="text" placeholder='Firstname' value={values.firstname} errors={errors.firstname} touched={touched.lastname} />
                                <InputV1 name='lastname' onChange={handleChange} type="text" placeholder='Lastname' value={values.lastname} errors={errors.lastname} touched={touched.lastname} />
                                <InputV2 icon2={<TbEye size={18} />} name='password' onChange={handleChange} type={passwordToggle ? "text" : "password"} placeholder='Password' value={values.password} errors={errors.password} touched={touched.password} toggle={passwordToggle} onToggle={setPasswordToggle} />
                                <InputV1 name='phone' onChange={handleChange} type="text" placeholder='9123456789' max={10} value={values.phone} errors={errors.phone} touched={touched.phone} />
                            </div>
                            <div className={PromptStyles.footer}>
                                {isSubmitting ? null : <CancelBtn onClose={onHandleAddUser} name="Cancel"/>}
                                <form onSubmit={handleSubmit}>
                                    <PrimaryButton loading={isSubmitting ? true : false} name='Submit' type='submit' />
                                </form>
                            </div>
                        </Prompt>
                    </Dialog> : null
            }
            {
                onDelete ? <Dialog>
                    <Prompt title='Delete User Admin' icon={<TbAlertCircleFilled size={23} />}>
                        <div className={PromptStyles.header}>
                            <span className={RegularPoppins.className}>
                                Are you sure you want to delete this admin user? This action is irreversible and will permanently remove all associated data.
                            </span>
                        </div>
                        <div className={PromptStyles.footer}>
                            <CancelBtn onClose={onHandleDeleteChange} name="Cancel"/>
                            <form onSubmit={formik.handleSubmit}>
                                <PrimaryButton loading={formik.isSubmitting ? true : false} name='Confirm' type='submit' />
                            </form>
                        </div>
                    </Prompt>
                </Dialog> : null
            }
            <div className={styles.header}>
                <div className={styles.searchContainer}>
                    <TbSearch size={23} />
                    <input type="Search" placeholder='Search here...' onChange={onHandleChange} />
                </div>
                <button onClick={onHandleAddUser}>
                    <span className={RegularPoppins.className}>
                        Add New
                    </span>
                </button>
            </div>
            <div className={styles.body}>
                <div className={styles.thead}>
                    <div className={styles.tr}>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Name</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Phone</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Birthday</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Date Created</span>
                        </div>
                        <div className={styles.th}>
                            <span className={MediumPoppins.className}>Action</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tbody}>
                    {isEmpty(data?.item) ? <NotAvailable /> : data?.item.map(({ userID, email, createdAt, myProfile: { lastname, firstname, birthday, phone } }: any) => (
                        <div key={userID} className={styles.tr}>
                            <div className={styles.td}>
                                <span className={RegularPoppins.className}>{lastname}, {firstname}</span>
                            </div>
                            <div className={styles.td}>
                                <span className={RegularPoppins.className}>{phone}</span>
                            </div>
                            <div className={styles.td}>
                                {Formatter(birthday)}
                            </div>
                            <div className={styles.td}>
                                <span>{Formatter(createdAt)}</span>
                            </div>
                            <div className={styles.td}>
                                <div className={styles.actionsBtnGrp}>
                                    <button onClick={() =>
                                        onHandleDeleteChange(userID)
                                    } className={styles.deleteBtn}>
                                        <TbTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastNotification />
            <Pagination
                itemsPerPage={itemsPerPage}
                nextButton={NextPage}
                prevButton={PrevPage}
                currentPage={data?.currentPage}
                hasNextPage={data?.hasNextPage}
                hasPrevPage={data?.hasPrevPage}
                totalItems={data?.totalItems}
                totalPages={data?.totalPages}
            />
        </div >
    )
}
