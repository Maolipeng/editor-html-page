import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Input, Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { TextArea } = Input;

import '@wangeditor/editor/dist/css/style.css' 

const EditorPage = () => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  // 编辑器内容
  const [html, setHtml] = useState('')

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = { }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = { 
      placeholder: '请输入内容...',
  }

  useEffect(() => {
      return () => {
          if (editor == null) return
          editor.destroy()
          setEditor(null)
      }
  }, [editor])
  const editorChange = (editor: IDomEditor) => {
    const htmlStr = editor.getHtml()
    console.log('htmlStr', htmlStr)
    setCopied(false)
    setHtml(htmlStr)
  }

  return (
      <div className="p-[20px]">
        <header className="text-center font-bold text-3xl">
          编辑器
        </header>
          <div className="mt-3" style={{ border: '1px solid #ccc', zIndex: 100}}>
              <Toolbar
                  editor={editor}
                  defaultConfig={toolbarConfig}
                  mode="default"
                  style={{ borderBottom: '1px solid #ccc' }}
              />
              <Editor
                  defaultConfig={editorConfig}
                  value={html}
                  onCreated={setEditor}
                  onChange={editorChange}
                  mode="default"
                  style={{ minHeight: '500px', maxHeight: '800px', overflowY: 'hidden' }}
              />
          </div>
          <div style={{ marginTop: '15px' }}>
            <div>
            <CopyToClipboard text={html}
          onCopy={() => setCopied(true)}>
          <Button type="primary">复制HTML</Button>
        </CopyToClipboard>
        {copied && <span className="text-red-500 ml-2">内容已拷贝！！！</span>}
            </div>
            <div
            dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
      </div>
  )
};

export default EditorPage;
