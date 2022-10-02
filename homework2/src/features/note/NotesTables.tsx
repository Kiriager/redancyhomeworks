import React, { useState } from 'react';
import { Category, CategoryStats, Note, NoteFormData, noteService } from "./Note";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  switchArchiveStatus, remove, edit, switchTableArchiveStatus,
  showCreateForm, hideCreateForm, add, discardEditForm, initiateEditNote,
  setAllNotesArchiveStatus, removeAll
} from './notesSlice';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';


export function NotesTable() {
  const formStatus = useAppSelector(state => state.notes.showCreateForm)
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  return (
    <table className="border-spacing-0 mt-14 w-full">
      <thead>
        <tr className="text-white bg-gray-800 h-[70px]">
          <Cell heading={true} content="" />
          <Cell heading={true} content="Name" />
          <Cell heading={true} content="Created" />
          <Cell heading={true} content="Category" />
          <Cell heading={true} content="Content" />
          <Cell heading={true} content="Dates" />
          <Cell heading={true} content="" />
          <HeadButton status={tableArchiveStatus} title="Archive/Unarchive All"
            action={setAllNotesArchiveStatus} icon="fa-solid fa-box-archive" />
          <HeadButton status={tableArchiveStatus} title="Delete All"
            action={removeAll} icon="fa-solid fa-trash" />
        </tr>
      </thead>
      <NoteRows />
      <tfoot>{formStatus ? <Form /> : !tableArchiveStatus
        ? <OutsideButton title="Create Note" insideTable={true} action={showCreateForm} /> : <></>}</tfoot>
    </table>
  )
}

function NoteRows() {
  const notes = useAppSelector(state => state.notes.notesList)
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  return (
    <tbody>
      {notes.filter((note) => { return note.archivedStatus === tableArchiveStatus }).map((note) => {
        return note.editStatus ? (<Form note={note} key={"note" + note.id} />)
          : (<SingleNote {...note} key={"note" + note.id} />)
      })}
    </tbody>
  )
}

function SingleNote(note: Note) {
  return (
    <tr className="bg-neutral-300 border-y-[10px] border-white h-[70px]">
      <CategoryIcon {...note.category} />
      <Cell heading={false} content={note.name} />
      <Cell heading={false} content={noteService.printMyDate(note.createDate)} />
      <Cell heading={false} content={note.category.categoryName} />
      <Cell heading={false} content={note.content} />
      <Cell heading={false} content={noteService.extractDates(note)} />
      <NoteButton title="Edit Note" noteId={note.id}
        action={initiateEditNote} icon="fa-solid fa-pen-to-square" />
      <NoteButton title="Archive/Unarchive" noteId={note.id}
        action={switchArchiveStatus} icon="fa-solid fa-box-archive" />
      <NoteButton title="Delete Note" noteId={note.id}
        action={remove} icon="fa-solid fa-trash" />
    </tr>
  )
}

interface FormProps {
  note?: Note
}

function Form(props: FormProps) {
  let defaultCategory = useAppSelector(state => {
    return state.notes.categoriesList[0].categoryName
  })
  const [name, setName] = useState(props.note ? props.note.name : "")
  const [categoryName, setCategoryName] = useState(props.note
    ? props.note.category.categoryName : defaultCategory)
  const [content, setContent] = useState(props.note ? props.note.content : "")

  return (
    <tr className="bg-neutral-300 border-y-[10px] border-white h-[70px]">
      {props.note === undefined
        ? <Cell heading={false} content="" />
        : <CategoryIcon {...props.note.category} />}

      <NoteFormInput name="name" callback={(e) => { setName(e.target.value) }} value={name} />
      <Cell heading={false} content={props.note ? noteService.printMyDate(props.note.createDate) : ""} />
      <CategorySelect callback={(e) => { setCategoryName(e.target.value) }} value={categoryName} />
      <NoteFormInput name="content" callback={(e) => { setContent(e.target.value) }} value={content} />
      <Cell heading={false} content={props.note ? noteService.extractDates(props.note) : ""} />

      {props.note === undefined
        ? <SubmitFormButton data={{ name: name, categoryName: categoryName, content: content }} />
        : <SubmitFormButton noteId={props.note.id}
          data={{ name: name, categoryName: categoryName, content: content }} />}

      {props.note === undefined
        ? <DiscardFormButton />
        : <DiscardFormButton noteId={props.note.id} />}

      <Cell heading={false} content="" />
    </tr>
  )
}

interface CategorySelectProps {
  value: string,
  callback: React.ChangeEventHandler<HTMLSelectElement>
}

function CategorySelect(props: CategorySelectProps) {
  return (
    <td className="p-[8px] h-[60px]">
      <select name="category" value={props.value}
        className="h-[100%] w-[100%] border-2 border-white focus:border-neutral-500 transition duration-1000 outline-0"
        onChange={props.callback}>
        <CategoryOptions />
      </select>
    </td>
  )
}

interface InputProps {
  callback: React.ChangeEventHandler<HTMLInputElement>,
  value: string,
  name: string
}

function NoteFormInput(props: InputProps) {
  return (
    <td className="p-[8px] h-[60px]">
      <input type="text" name={props.name} autoComplete="off"
        value={props.value}
        className="h-[100%] w-[100%] border-2 border-white focus:border-neutral-500 transition duration-1000 outline-0"
        onChange={props.callback} />
    </td>
  )
}

interface SubmitFormButtonProps {
  noteId?: number,
  data: NoteFormData
}

function SubmitFormButton(props: SubmitFormButtonProps) {
  const dispatch = useAppDispatch()
  return (
    <td className="p-[8px]">
      <button title="Save Note" onClick={() => {
        return props.noteId
          ? dispatch(edit({ data: props.data, noteId: props.noteId }))
          : dispatch(add(props.data))
      }}>
        <ButtonIcon iconTitle="fa-solid fa-check" light={false} />
      </button>
    </td>
  )
}

interface DiscardFormButtonProps {
  noteId?: number
}

function DiscardFormButton(props: DiscardFormButtonProps) {
  const dispatch = useAppDispatch()
  return (
    <td className="p-[8px]">
      <button title="Discard" onClick={() => {
        return props.noteId ? dispatch(discardEditForm(props.noteId)) : dispatch(hideCreateForm())
      }}>
        <ButtonIcon iconTitle="fa-solid fa-xmark" light={false} />
      </button>
    </td>
  )
}

export function StatsTable() {
  const notes = useAppSelector(state => state.notes.notesList)
  const categories = useAppSelector(state => state.notes.categoriesList)

  return (
    <table className="border-spacing-0 mt-14 w-full">
      <thead><tr className="text-white bg-gray-800 h-[70px]">
        <Cell heading={true} content="" />
        <Cell heading={true} content="Note Category" />
        <Cell heading={true} content="Active" />
        <Cell heading={true} content="Archived" />
      </tr></thead>
      <tbody>
        {categories.map((category, index) => {
          return (<CategoryStatsRow
            {...noteService.getCategoryStats(notes, category)} key={"stats" + index} />)
        })}
      </tbody>
    </table>
  )
}

function CategoryStatsRow(categoryStats: CategoryStats) {
  return (
    <tr className="bg-neutral-300 border-y-[10px] border-white h-[70px]">
      <CategoryIcon {...categoryStats.category} />
      <Cell heading={false} content={categoryStats.category.categoryName} />
      <Cell heading={false} content={categoryStats.active.toString()} />
      <Cell heading={false} content={categoryStats.archived.toString()} />
    </tr>
  )
}

function CategoryIcon(category: Category) {
  return (
    <td className="p-[8px]">
      <div className="text-xl text-neutral-200 bg-neutral-900 w-[36px] h-[36px] flex rounded-full">
        <i className={category.categoryIcon + " m-auto"}></i>
      </div>
    </td>
  )
}

function CategoryOptions() {
  let categories = useAppSelector(state => state.notes.categoriesList)
  return (
    <>
      {categories.map((category, index) => {
        return (<option key={"cat" + index} value={category.categoryName}>{category.categoryName}</option>)
      })}
    </>
  )
}

interface CellProps {
  content: string,
  heading: boolean
}

function Cell(props: CellProps) {
  return (
    props.heading ? <th className="p-[8px] text-start box-border">{props.content}</th> :
      <td className="p-[8px] box-border">{props.content}</td>
  )
}

interface IconProps {
  iconTitle: string,
  light: boolean
}

function ButtonIcon(props: IconProps) {
  let style = props.light ? "text-white hover:text-neutral-400 text-xl "
    : "text-gray-800 hover:text-gray-400 text-xl "
  return (
    <i className={style + props.iconTitle}></i>
  )
}

interface ButtonProps {
  noteId: number,
  action: ActionCreatorWithPayload<number, string>,
  icon: string,
  title: string
}

function NoteButton(props: ButtonProps) {
  const dispatch = useAppDispatch()
  return (
    <td className="p-[8px]">
      <button title={props.title}
        onClick={() => dispatch(props.action(props.noteId))}>
        <ButtonIcon iconTitle={props.icon} light={false} />
      </button>
    </td>
  )
}

interface HeadButtonProps {
  status: boolean,
  action: ActionCreatorWithPayload<boolean>,
  icon: string,
  title: string
}

function HeadButton(props: HeadButtonProps) {
  const dispatch = useAppDispatch()
  return (
    <th className="p-[8px]">
      <button title={props.title}
        onClick={() => dispatch(props.action(props.status))}>
        <ButtonIcon iconTitle={props.icon} light={true} />
      </button>
    </th>
  )
}

interface OutsideButtonProps {
  insideTable: boolean,
  action: ActionCreatorWithoutPayload<string>,
  title: string
}

function OutsideButton(props: OutsideButtonProps) {
  const dispatch = useAppDispatch()
  let btn = (
    <button className="bg-gray-600 h-[35px] text-white w-[100%]"
      onClick={() => dispatch(props.action())}>
      {props.title}
    </button>
  )
  return props.insideTable ? (
    <tr><td colSpan={9} className="bg-white pl-0 pr-0">
      {btn}
    </td></tr>
  ) : btn
}

export function TableArchiveStatusButton() {
  const tableArchiveStatus = useAppSelector(state => state.notes.showArchiveNotes)
  return <OutsideButton action={switchTableArchiveStatus} insideTable={false}
    title={tableArchiveStatus ? "Show Active Notes" : "Show Archived Notes"} />
}