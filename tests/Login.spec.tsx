import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event"

const PasswordBox = () => {
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>();

    const onSubmit = (event: any) => {
        event.preventDefault();
        setHasSubmitted(true);
        console.log({length: event.curretTarget.value.length})
        console.log({length: event.curretTarget.value.length})
        if( event.curretTarget.value.length > 8 ) {
            setIsValid(true);
            return;
        }
        setIsValid(false);
    }
    
    return (
        <div>
            <input placeholder='password' data-testid="password" />
            <button type='submit' name='submit' onClick={(event) => onSubmit(event)}>
                submit
            </button>
            {
                hasSubmitted &&
                    <p> {isValid ? "Valid" : "Invalid"}</p>
            }
        </div>
    )
}

describe('Password input', () => {

    it("Password with less than eight characters", async () => {
        // Given
        render(<PasswordBox />);
        await userEvent.type(screen.getByTestId("password"), "54325");
    
        // When
        await userEvent.click(screen.getByRole("button", {name: "submit"}));
    
        // Then 
        expect(screen.getByText('Invalid')).toBeTruthy();
    });
    it("Password with more than eight characters", async () => {
        // Given
        render(<PasswordBox />);
        await userEvent.type(screen.getByTestId("password"), "123456789");
    
        // When
        await userEvent.click(screen.getByRole("button", {name: "submit"}));
    
        // Then 
        expect(screen.getByText('Valid')).toBeTruthy();
    });
    
});