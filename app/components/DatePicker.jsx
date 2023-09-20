import * as React from 'react';
import Calendar from './Calendar';
import { useState } from 'react';

export default function DatePicker({ date = new Date() }) {

    return (
        <>
            <Calendar />
        </>
    )
}