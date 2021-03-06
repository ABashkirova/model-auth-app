import React, { MouseEvent } from "react"

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      valid?: boolean;
    }
}
const validate = (value: any, rules: any) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case "minLength":
                const minResult = minLengthValidator(value, rules[rule]);
                isValid = isValid && minResult;
                break;
            case "maxLength":
                const maxResult = maxLengthValidator(value, rules[rule]);
                isValid = isValid && maxResult;
                break;
            case "isRequired":
                const requiredResult = requiredValidator(value);
                console.log("isRequired", requiredResult);
                isValid = isValid && requiredResult;
                break;
            default:
                isValid = true;
        }
        console.log(isValid);
    }
    return isValid;
};
/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value: string, minLength: number) => {
    return value.length >= minLength;
};
/**
 * maxLength Val
 * @param  value
 * @param  maxLength
 * @return
 */
const maxLengthValidator = (value: string, maxLength: number) => {
    return value.length <= maxLength;
};
/**
 * Check to confirm that field is required
 *
 * @param  value
 * @return
 */
const requiredValidator = (value: string) => {
    return value.trim() !== "";
};

export interface FormState {
    formIsValid: boolean,
    formControls: {
        login: {
            value: string,
            placeholder: string,
            valid: boolean,
            validationRules: { minLength: number, maxLength: number, isRequired: boolean }
        },
        password: {
            value: string,
            placeholder: string,
            valid: boolean,
            validationRules: { minLength: number, isRequired: boolean }
        },
        resource: {
            value: string,
            placeholder: string,
            valid: boolean,
            validationRules: { minLength: number, isRequired: boolean }
        },
        role: {
            value: string,
            placeholder: string,
            valid: boolean,
            options: { value: string, displayValue: string }[]
        },
        dateStart: {
            value: string,
            placeholder: string,
            valid: boolean,
            validationRules: { isRequired: boolean }
        },
        dateEnd: {
            value: string,
            placeholder: string,
            valid: boolean,
            validationRules: { isRequired: boolean }
        },
        volume: {
            value: string,
            placeholder: string,
            valid: boolean,
            validationRules: { isRequired: boolean }
        }
    }
};

interface FormProps {
    refreshActivities(userId: number, accessId: number): void
}

export default class Form extends React.Component<FormProps> {
    state: FormState = {
        formIsValid: false,
        formControls: {
            login: {
                value: "",
                placeholder: "Логин",
                valid: false,
                validationRules: {
                    minLength: 1,
                    maxLength: 10,
                    isRequired: true
                }
            },
            password: {
                value: "",
                placeholder: "Пароль",
                valid: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true
                }
            },
            resource: {
                value: "",
                placeholder: "Ресурс, A.B.C",
                valid: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true
                }
            },
            role: {
                value: "",
                placeholder: "Роль доступа",
                valid: true,
                options: [
                    { value: "READ", displayValue: "Read" },
                    { value: "WRITE", displayValue: "Write" },
                    { value: "EXECUTE", displayValue: "Execute" }
                ]
            },
            dateStart: {
                value: "",
                placeholder: "yyyy-mm-dd",
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
            dateEnd: {
                value: "",
                placeholder: "yyyy-mm-dd",
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
            volume: {
                value: "",
                placeholder: "Объем ресурса",
                valid: false,
                validationRules: {
                    isRequired: true
                }
            }
        }
    };

    constructor(props: FormProps) {
        super(props);
    }
    // @ts-ignore
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            // @ts-ignore
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        const isValid = validate(value, updatedFormElement.validationRules);
        updatedFormElement.valid = isValid;
        // @ts-ignore
        updatedControls[name] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            // @ts-ignore
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        console.log("form isValid", formIsValid)

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    }

    // @ts-ignore
    formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.formControls);

        // создать объект для формы
        // @ts-ignore
        var formData = new FormData(document.forms.activity);

        var object = {};
        formData.forEach((value, key) => {
            // @ts-ignore
            object[key] = value
        });
        var json = JSON.stringify(object);

        // отослать
        fetch("/ajax/activity", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
            .then(result => result.json())
            .then(result => {
                //json = JSON.stringify(result)
                alert(result.exitCode)
                if (result.exitCode == "SUCCESS") {
                    //вызов Page.refreshActivities(userId, accessId)
                    console.log("accessId" + result.accessId)
                    this.props.refreshActivities(result.userId, result.accessId)
                }
            })
    }

    render() {
        let formControl = "form-control";
        return (
            <div className="container">
                <form name="activity">
                    <div className="form-group">
                        <label>Логин:</label>
                        <input
                            type="text"
                            name="login"
                            className={formControl}
                            placeholder={this.state.formControls.login.placeholder}
                            value={this.state.formControls.login.value}
                            onChange={this.changeHandler}
                            valid={this.state.formControls.login.valid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            className={formControl}
                            placeholder={this.state.formControls.password.placeholder}
                            value={this.state.formControls.password.value}
                            onChange={this.changeHandler}
                            valid={this.state.formControls.password.valid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ресурс:</label>
                        <input
                            type="text"
                            name="resource"
                            className={formControl}
                            placeholder={this.state.formControls.resource.placeholder}
                            value={this.state.formControls.resource.value}
                            onChange={this.changeHandler}
                            valid={this.state.formControls.resource.valid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Роль доступа:</label>
                        <select
                            className="custom-select"
                            name="role"
                            value={this.state.formControls.role.value}
                            onChange={this.changeHandler}
                        >
                            {this.state.formControls.role.options.map(option => (
                                <option value={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Дата обращения:</label>
                        <input
                            type="text"
                            name="dateStart"
                            className={formControl}
                            placeholder={this.state.formControls.dateStart.placeholder}
                            value={this.state.formControls.dateStart.value}
                            onChange={this.changeHandler}
                            valid={this.state.formControls.dateStart.valid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Дата возврата:</label>
                        <input
                            type="text"
                            name="dateEnd"
                            className={formControl}
                            placeholder={this.state.formControls.dateEnd.placeholder}
                            value={this.state.formControls.dateEnd.value}
                            onChange={this.changeHandler}
                            valid={this.state.formControls.dateEnd.valid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Запрашиваемый объем:</label>
                        <input
                            type="text"
                            name="volume"
                            className={formControl}
                            placeholder={this.state.formControls.volume.placeholder}
                            value={this.state.formControls.volume.value}
                            onChange={this.changeHandler}
                            valid={this.state.formControls.volume.valid}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-secondary"
                            onClick={this.formSubmitHandler}
                            disabled={!this.state.formIsValid}
                        >
                            Отправить запрос
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
