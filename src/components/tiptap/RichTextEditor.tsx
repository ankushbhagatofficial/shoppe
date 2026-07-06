"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from '@tiptap/extension-blockquote'
import Highlight from "@tiptap/extension-highlight";
import FormatBoldIcon from '@iconify-react/mdi/format-bold';
import FormatItalicIcon from '@iconify-react/mdi/format-italic';
import FormatUnderlineIcon from '@iconify-react/mdi/format-underline';
import FormatStrikethrough from '@iconify-react/mdi/format-strikethrough';
import FormatListBulletedIcon from '@iconify-react/material-symbols/format-list-bulleted';
import FormatListNumbersIcon from '@iconify-react/mdi/format-list-numbers';
import FormatAlignLeftIcon from '@iconify-react/mdi/format-align-left';
import FormatAlignCenterIcon from '@iconify-react/mdi/format-align-center';
import FormatAlignJustifyIcon from '@iconify-react/material-symbols/format-align-justify';
import FormatAlignRightIcon from '@iconify-react/mdi/format-align-right';
import FormatQuoteCloseIcon from '@iconify-react/mdi/format-quote-close';
import FormatInkHighlighterOutlineRoundedIcon from '@iconify-react/material-symbols/format-ink-highlighter-outline-rounded';
import Link2RoundedIcon from '@iconify-react/material-symbols/link-2-rounded';
import CodeTagsIcon from '@iconify-react/mdi/code-tags';
import ImageOutlineIcon from '@iconify-react/mdi/image-outline';
import UndoIcon from '@iconify-react/mdi/undo';
import RedoIcon from '@iconify-react/mdi/redo';
import { ChangeEvent, ComponentType, useEffect, useState } from "react";
import HighlightModal from "./extensions/Highlight";
import LinkModal from "./extensions/Link";
import ImageModal from "./extensions/Image";

function Toolbar({ editor }: any) {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isUnderline: editor.isActive("underline"),
      isStrike: editor.isActive("strike"),
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isBlockquote: editor.isActive("blockquote"),
      isCodeBlock: editor.isActive("codeBlock"),
      isHighlight: editor.isActive("highlight"),
      isLink: editor.isActive("link"),
      isAlignLeft: editor.isActive({ textAlign: "left" }),
      isAlignCenter: editor.isActive({ textAlign: "center" }),
      isAlignJustify: editor.isActive({ textAlign: "justify" }),
      isAlignRight: editor.isActive({ textAlign: "right" }),
      isParagraph: editor.isActive("paragraph"),
      heading: {
        1: editor.isActive("heading", { level: 1 }),
        2: editor.isActive("heading", { level: 2 }),
        3: editor.isActive("heading", { level: 3 }),
        4: editor.isActive("heading", { level: 4 }),
        5: editor.isActive("heading", { level: 5 }),
        6: editor.isActive("heading", { level: 6 }),
      },
      canRedo: editor.can().redo(),
      canUndo: editor.can().undo(),
    })
  })

  const [highlightModal, setHighlightModal] = useState(false)
  const [linkModal, setLinkModal] = useState(false)
  const [link, setLink] = useState("")
  const [imageModal, setImageModal] = useState(false)

  const levels: number[] = [
    1,
    2,
    3,
    4,
    5,
    6
  ]

  type Level = 1 | 2 | 3 | 4 | 5 | 6

  function getCurrentBlock() {
    for (const level of levels) {
      if (editorState.heading[level as Level]) {
        return `h${level}`;
      }
    }

    return "p";
  }

  const handleBlockChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "p") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number(value[1]) as 1 | 2 | 3 })
        .run();
    }
  }

  const toggleLinkModal = () => {
    setLink(editor.getAttributes('link').href ?? "")
    setLinkModal(!linkModal)
  }

  const Btn = ({ disabled = false, Icon, onClick, active, title }: { disabled?: boolean, title?: string, Icon: ComponentType<{ className: string, height: string }>, active?: boolean, onClick: () => void }) => (
    <button
      disabled={disabled}
      type="button"
      title={title}
      onClick={onClick}
      className={`disabled:opacity-50 rounded p-2 hover:bg-neutral-700 transition ${active ? "bg-neutral-700" : ""
        }`}
    >
      <Icon className="text-md" height="1.2em" />
    </button>
  );

  return (
    <div className="relative flex flex-wrap items-center gap-1 border-b p-2">

      <select
        className="p-2 rounded font-poppins font-semibold text-sm outline-0 hover:bg-neutral-700"
        value={getCurrentBlock()}
        onChange={handleBlockChange}
      >
        <option value="p">Paragraph</option>

        {
          levels.map(item => (
            <option key={item} value={"h" + item}>Heading {item}</option>
          ))
        }

      </select>

      <Btn
        title="Bold"
        Icon={FormatBoldIcon}
        active={editorState.isBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <Btn
        title="Italic"
        Icon={FormatItalicIcon}
        active={editorState.isItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <Btn
        title="Underline"
        Icon={FormatUnderlineIcon}
        active={editorState.isUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      <Btn
        title="Strikethrough"
        Icon={FormatStrikethrough}
        active={editorState.isStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <Btn
        title="Toggle Unordered List"
        Icon={FormatListBulletedIcon}
        active={editorState.isBulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />

      <Btn
        title="Toggle Ordered List"
        Icon={FormatListNumbersIcon}
        active={editorState.isOrderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <Btn
        title="Align Left"
        Icon={FormatAlignLeftIcon}
        active={editorState.isAlignLeft}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />

      <Btn
        title="Align Center"
        Icon={FormatAlignCenterIcon}
        active={editorState.isAlignCenter}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />

      <Btn
        title="Align Right"
        Icon={FormatAlignRightIcon}
        active={editorState.isAlignRight}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />

      <Btn
        title="Align Justify"
        Icon={FormatAlignJustifyIcon}
        active={editorState.isAlignJustify}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      />

      <Btn
        title="Toggle Blockquote"
        Icon={FormatQuoteCloseIcon}
        active={editorState.isBlockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />

      <div className="relative">
        <Btn
          title="Highlighting Color"
          Icon={FormatInkHighlighterOutlineRoundedIcon}
          active={editorState.isHighlight}
          onClick={() => setHighlightModal(!highlightModal)}
        />
        <HighlightModal open={highlightModal} setOpen={setHighlightModal} editor={editor} />
      </div>

      <Btn
        title="Insert Link"
        Icon={Link2RoundedIcon}
        onClick={() => toggleLinkModal()}
      />

      <LinkModal editor={editor} link={link} setLink={setLink} open={linkModal} setOpen={setLinkModal} />

      <Btn
        title="Insert Image"
        Icon={ImageOutlineIcon}
        onClick={() => setImageModal(!imageModal)}
      />

      <ImageModal editor={editor} open={imageModal} setOpen={setImageModal} />

      <Btn
        title="Toggle Codeblock"
        Icon={CodeTagsIcon}
        active={editorState.isCodeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <Btn
        title="Undo"
        Icon={UndoIcon}
        disabled={!editorState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      />

      <Btn
        title="Redo"
        Icon={RedoIcon}
        disabled={!editorState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}

export default function RichTextEditor({ value, onChange }: { value: string, onChange: Function }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      Blockquote,
      Image,
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-xl">
      {editor &&
        <Toolbar editor={editor} />
      }
      <EditorContent
        editor={editor}
        className="min-h-[220px] p-2 prose dark:prose-invert max-w-none"
      />
      <BubbleMenu editor={editor} >
      </BubbleMenu>
      <FloatingMenu editor={editor} >
      </FloatingMenu>
    </div>
  );
}
