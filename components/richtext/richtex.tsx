"use client"
import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import '@/styles/css/tiptap.css'
import { TbBold, TbList, TbListNumbers, TbH1, TbH2, TbH3, TbH4, TbItalic, TbUnderline, TbStrikethrough, TbAlignCenter, TbAlignLeft, TbAlignRight, TbAlignJustified } from 'react-icons/tb'


//Tiptap Extension
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import List from '@tiptap/extension-list-item'
import Underline from '@tiptap/extension-underline';
import Strikethrough from '@tiptap/extension-strike'
import Paragraph from '@tiptap/extension-paragraph';
import styles from '@/styles/components/richtext/index.module.scss'
import TextAlign from '@tiptap/extension-text-align';


export default function RichTextEditor({ value, setFieldValue }: any) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Paragraph,
            Heading.configure({
                levels: [1, 2, 3, 4]
            }),
            List],
        injectCSS: true,
        content: value ? value: null,
        onBlur: ({ editor }) => {
            setFieldValue("description", editor.getHTML())
        }
    })

    useEffect(() => {
        if (editor && value) {
            editor.commands.setContent(value)
        }
    }, [editor, value])

    if (!editor) {
        return null
    }


    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.basic}>
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? `${styles.isActive}` : ''}>
                        <TbBold size={18} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? `${styles.isActive}` : ''}>
                        <TbItalic size={18} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? `${styles.isActive}` : ''}>
                        <TbUnderline size={18} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? `${styles.isActive}` : ''}>
                        <TbStrikethrough size={18} />
                    </button>

                </div>
                <div className={styles.markup}>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('listitem') ? `${styles.isActive}` : ''}>
                        <TbListNumbers size={18} />
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletlist') ? `${styles.isActive}` : ''}>
                        <TbList size={18} />
                    </button>
                </div>
            </div>
            <EditorContent  className={styles.tiptap} editor={editor} />
        </div >
    )
}
