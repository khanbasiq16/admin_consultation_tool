
// "use client";

// import React, { useState, useMemo, useRef } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const DEFAULT_TEMPLATE = `SERVICE AGREEMENT

// This Service Agreement (the "Agreement") is made effective as of [Effective_Date] between:

// Provider:
// [Company_Name]
// [Company_Address]

// Client:
// [Client_Name]
// [Client_Address]

// 1. Services
// Provider agrees to perform the following services (the "Services"):
// [Project_Description]

// 2. Term
// This Agreement will commence on [Effective_Date] and will continue until the Services are completed, unless earlier terminated under the terms of this Agreement.

// 3. Fees and Payment
// The total fee for the Services is [Total_Cost].
// Payment terms: [Payment_Terms]

// 4. Confidentiality
// Both parties agree to keep confidential all non-public information exchanged in connection with this Agreement.

// 5. Governing Law
// This Agreement will be governed by and construed in accordance with the laws of [Governing_Law].

// 6. Signatures

// Provider:
// [Company_Signer_Name]
// _____________________________

// Client:
// [Client_Signer_Name]
// _____________________________

// Appendix A — Services
// [Project_Description]
// `;

// const PLACEHOLDERS = [
//   "Company_Name",
//   "Company_Address",
//   "Client_Name",
//   "Client_Address",
//   "Effective_Date",
//   "Project_Description",
//   "Total_Cost",
//   "Payment_Terms",
//   "Governing_Law",
//   "Company_Signer_Name",
//   "Client_Signer_Name",
//   "Company_Logo",
// ];

// export default function TemplateTrigger() {
//   const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
//   const [values, setValues] = useState({
//     Company_Name: "Ravens Digital",
//     Company_Address: "123 Street, Karachi, Pakistan",
//     Client_Name: "Client Company Pvt Ltd",
//     Client_Address: "Client Address Line, City",
//     Effective_Date: new Date().toLocaleDateString("en-GB"),
//     Project_Description: "Website design and development, responsive UI, CMS integration.",
//     Total_Cost: "PKR 150,000",
//     Payment_Terms: "50% upfront, 50% on delivery within 15 days",
//     Governing_Law: "Pakistan",
//     Company_Signer_Name: "Ravens Digital — Authorized Signatory",
//     Client_Signer_Name: "Client Representative",
//     Company_Logo: "https://brintor.com/assets/img/logo-icon.png",
//   });
//   const textareaRef = useRef(null);
//   const previewRef = useRef(null);

//   // Detect placeholders actually used in template
//   const detectedPlaceholders = useMemo(() => {
//     const set = new Set();
//     const re = /\[([A-Za-z0-9_]+)\]/g;
//     let m;
//     while ((m = re.exec(template)) !== null) {
//       set.add(m[1]);
//     }
//     const ordered = PLACEHOLDERS.filter((p) => set.has(p)).concat(
//       [...set].filter((s) => !PLACEHOLDERS.includes(s))
//     );
//     return ordered;
//   }, [template]);

//   // Render preview HTML
//   function renderPreviewHTML() {
//     const replaced = template.replace(/\[([A-Za-z0-9_]+)\]/g, (m, key) => {
//       if (key === "Company_Logo" && values[key]) {
//         return `<img src="${values[key]}" style="max-width:150px; margin-bottom:10px;" />`;
//       }
//       return values[key] ?? "";
//     });

//     const html = replaced
//       .split("\n")
//       .map((line) =>
//         line.trim().startsWith("<img") ? line : line.trim() === "" ? "<br/>" : escapeHtml(line)
//       )
//       .join("<br/>");

//     return `<div style="font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #111; font-size: 13px; line-height: 1.5; text-align: left;">
//       ${html}
//     </div>`;
//   }

//   // Basic HTML escape
//   function escapeHtml(text) {
//     return text
//       .replaceAll("&", "&amp;")
//       .replaceAll("<", "&lt;")
//       .replaceAll(">", "&gt;")
//       .replaceAll('"', "&quot;")
//       .replaceAll("'", "&#039;");
//   }

//   // Insert placeholder at cursor position
//   function insertPlaceholder(ph) {
//     const textarea = textareaRef.current;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const text = template.slice(0, start) + `[${ph}]` + template.slice(end);
//     setTemplate(text);
//     setTimeout(() => {
//       textarea.selectionStart = textarea.selectionEnd = start + ph.length + 2;
//       textarea.focus();
//     }, 0);
//   }

//   // Insert formatting (bold, italic, heading)
//   function insertFormatting(type) {
//     const textarea = textareaRef.current;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     let text = template;
//     if (type === "bold") {
//       text = template.slice(0, start) + "**" + template.slice(start, end) + "**" + template.slice(end);
//     } else if (type === "italic") {
//       text = template.slice(0, start) + "*" + template.slice(start, end) + "*" + template.slice(end);
//     } else if (type === "heading") {
//       const lineStart = template.lastIndexOf("\n", start - 1) + 1;
//       text = template.slice(0, lineStart) + "# " + template.slice(lineStart);
//     }
//     setTemplate(text);
//     setTimeout(() => {
//       textarea.selectionStart = textarea.selectionEnd = end + (type === "heading" ? 2 : 4);
//       textarea.focus();
//     }, 0);
//   }

//   // Update field value
//   function setFieldValue(key, v) {
//     setValues((s) => ({ ...s, [key]: v }));
//   }

//   // Save template stub
//   async function handleSaveTemplate() {
//     try {
//       alert("Template saved (stub). Integrate API to persist.");
//     } catch (err) {
//       console.error(err);
//       alert("Save failed.");
//     }
//   }

//   // Generate PDF
//   async function handleGeneratePDF() {
//     if (!previewRef.current) return;
//     const element = previewRef.current;
//     const originalBg = element.style.background;
//     element.style.background = "#ffffff";

//     const canvas = await html2canvas(element, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       unit: "pt",
//       format: "a4",
//     });
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("Service-Agreement.pdf");

//     element.style.background = originalBg;
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
//           Open Template Editor
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-gray-800">Template Editor & Live Preview</DialogTitle>
//         </DialogHeader>

//         {/* Toolbar */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           <Button
//             size="sm"
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//             onClick={() => insertFormatting("bold")}
//           >
//             Bold
//           </Button>
//           <Button
//             size="sm"
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//             onClick={() => insertFormatting("italic")}
//           >
//             Italic
//           </Button>
//           <Button
//             size="sm"
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//             onClick={() => insertFormatting("heading")}
//           >
//             Heading
//           </Button>
//           {PLACEHOLDERS.map((ph) => (
//             <Button
//               key={ph}
//               size="sm"
//               variant="outline"
//               className="border-gray-300 text-gray-700 hover:bg-gray-100"
//               onClick={() => insertPlaceholder(ph)}
//             >
//               [{ph}]
//             </Button>
//           ))}
//           <Button
//             size="sm"
//             className="ml-2 bg-gray-500 hover:bg-gray-600 text-white"
//             onClick={() => setTemplate(DEFAULT_TEMPLATE)}
//           >
//             Reset Default
//           </Button>
//         </div>

//         {/* Layout: Editor + Preview */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Editor */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">Template Editor</h3>
//             <textarea
//               ref={textareaRef}
//               value={template}
//               onChange={(e) => setTemplate(e.target.value)}
//               rows={20}
//               className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Edit your template here..."
//             />
//             <div className="flex gap-3 mt-4">
//               <Button
//                 className="bg-green-500 hover:bg-green-600 text-white"
//                 onClick={handleSaveTemplate}
//               >
//                 Save Template
//               </Button>
//               <Button
//                 variant="secondary"
//                 className="bg-blue-500 hover:bg-blue-600 text-white"
//                 onClick={handleGeneratePDF}
//               >
//                 Generate PDF
//               </Button>
//             </div>
//           </div>

//           {/* Preview and Fields */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">Fill Fields</h3>
//             <div className="space-y-3 mb-4">
//               {detectedPlaceholders.length === 0 && (
//                 <div className="text-sm text-gray-500">No placeholders detected.</div>
//               )}
//               {detectedPlaceholders.map((key) => (
//                 <div key={key} className="flex flex-col">
//                   <label className="text-sm font-medium text-gray-600">{key}</label>
//                   {key.toLowerCase().includes("description") || key.toLowerCase().includes("address") ? (
//                     <textarea
//                       rows={3}
//                       value={values[key] ?? ""}
//                       onChange={(e) => setFieldValue(key, e.target.value)}
//                       className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   ) : (
//                     <input
//                       value={values[key] ?? ""}
//                       onChange={(e) => setFieldValue(key, e.target.value)}
//                       className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">Live Preview</h3>
//             <div
//               ref={previewRef}
//               id="contract-preview"
//               className="p-6 border rounded-lg bg-white shadow-sm"
//               dangerouslySetInnerHTML={{ __html: renderPreviewHTML() }}
//             />
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import React, { useState, useMemo, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bold, Italic, Heading1, Code, Save, FileDown, RotateCcw, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { marked } from "marked"; // For Markdown parsing

// --- Default Template and Placeholders ---
const DEFAULT_TEMPLATE = `[Company_Logo]

SERVICE AGREEMENT

This Service Agreement (the "Agreement") is made effective as of **[Effective_Date]** between:

**Provider:**
[Company_Name]
[Company_Address]

**Client:**
[Client_Name]
[Client_Address]

---

### 1. Services
Provider agrees to perform the following services (the "Services"):
[Project_Description]

### 2. Term
This Agreement will commence on **[Effective_Date]** and will continue until the Services are completed, unless earlier terminated under the terms of this Agreement.

### 3. Fees and Payment
The total fee for the Services is **[Total_Cost]**.
Payment terms: _[Payment_Terms]_

### 4. Confidentiality
Both parties agree to keep confidential all non-public information exchanged in connection with this Agreement.

### 5. Governing Law
This Agreement will be governed by and construed in accordance with the laws of **[Governing_Law]**.

---

**6. Signatures**

**Provider:**
[Company_Signer_Name]
_____________________________

**Client:**
[Client_Signer_Name]
_____________________________

`;

const PLACEHOLDERS = [
  "Company_Name", "Company_Address", "Client_Name", "Client_Address",
  "Effective_Date", "Project_Description", "Total_Cost", "Payment_Terms",
  "Governing_Law", "Company_Signer_Name", "Client_Signer_Name", "Company_Logo",
];

export default function TemplateTrigger() {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [values, setValues] = useState({
    Company_Name: "Ravens Digital",
    Company_Address: "123 Street, Karachi, Pakistan",
    Client_Name: "Client Company Pvt Ltd",
    Client_Address: "Client Address Line, City",
    Effective_Date: new Date().toLocaleDateString("en-GB"),
    Project_Description: "Website design and development, responsive UI, and CMS integration.",
    Total_Cost: "PKR 150,000",
    Payment_Terms: "50% upfront, 50% on delivery within 15 days.",
    Governing_Law: "Pakistan",
    Company_Signer_Name: "Ravens Digital — Authorized Signatory",
    Client_Signer_Name: "Client Representative",
    Company_Logo: "https://brintor.com/assets/img/logo-icon.png",
  });
  const textareaRef = useRef(null);
  const previewRef = useRef(null);

  // Detect placeholders actually used in the template to show relevant fields
  const detectedPlaceholders = useMemo(() => {
    const set = new Set();
    const re = /\[([A-Za-z0-9_]+)\]/g;
    let m;
    while ((m = re.exec(template)) !== null) {
      set.add(m[1]);
    }
    return PLACEHOLDERS.filter((p) => set.has(p));
  }, [template]);

  // Render preview HTML with Markdown support
  const renderPreviewHTML = () => {
    const replaced = template.replace(/\[([A-Za-z0-9_]+)\]/g, (match, key) => {
        if (key === "Company_Logo" && values[key]) {
            return `<img src="${values[key]}" alt="Company Logo" style="max-width:150px; margin-bottom: 20px;" />`;
        }
        return values[key] ?? "";
    });

    // Use the 'marked' library to parse Markdown syntax
    const parsedHtml = marked.parse(replaced, { gfm: true, breaks: true });
    return `<div class="prose prose-sm max-w-none">${parsedHtml}</div>`;
  };
  
  // Insert placeholder at cursor position
  const insertPlaceholder = (ph) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = `${template.slice(0, start)}[${ph}]${template.slice(end)}`;
    setTemplate(text);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + ph.length + 2;
      textarea.focus();
    }, 0);
  };

  // Insert Markdown formatting around selected text
  const insertFormatting = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = template.slice(start, end);
    let newText = '';
    let cursorPosition = end;

    switch (type) {
        case 'bold':
            newText = `**${selectedText}**`;
            cursorPosition = end + 4;
            break;
        case 'italic':
            newText = `*${selectedText}*`;
            cursorPosition = end + 2;
            break;
        case 'heading':
            const lineStart = template.lastIndexOf("\n", start - 1) + 1;
            newText = `### ${template.slice(lineStart)}`;
            setTemplate(template.slice(0, lineStart) + newText);
            return; // Exit early as logic is different
    }

    const updatedTemplate = template.slice(0, start) + newText + template.slice(end);
    setTemplate(updatedTemplate);
    setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition;
        textarea.focus();
    }, 0);
  };

  const handleGeneratePDF = async () => {
    if (!previewRef.current) return;
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 80; // with margin
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, "PNG", 40, 40, pdfWidth, pdfHeight);
    pdf.save("Service-Agreement.pdf");
  };

  const handleSaveTemplate = async () => {
    alert("Template saved (Stub). Integrate API to persist.");
  };

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white  font-semibold py-2 px-4 rounded-lg shadow-md">
          Open Modern Template Editor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[95vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-bold text-gray-800">
            Modern Document Editor
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-12 gap-2 flex-grow overflow-y-auto p-2 h-[50vh]">
            {/* Left Panel: Fields */}
            <div className="col-span-3">
                 <Card className="h-full">
                     <CardHeader>
                         <CardTitle className="text-lg">Contract Fields</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <ScrollArea className="h-[75vh] pr-4">
                             <div className="space-y-4">
                                 {detectedPlaceholders.map((key) => (
                                     <div key={key} className="space-y-1">
                                         <Label htmlFor={key} className="text-sm font-medium text-gray-700">{key.replace(/_/g, ' ')}</Label>
                                         {key.toLowerCase().includes("description") || key.toLowerCase().includes("address") ? (
                                             <Textarea
                                                id={key}
                                                rows={3}
                                                value={values[key] ?? ""}
                                                onChange={(e) => setValues(s => ({ ...s, [key]: e.target.value }))}
                                                className="w-full text-sm"
                                             />
                                         ) : (
                                             <Input
                                                id={key}
                                                value={values[key] ?? ""}
                                                onChange={(e) => setValues(s => ({ ...s, [key]: e.target.value }))}
                                                className="w-full text-sm"
                                             />
                                         )}
                                     </div>
                                 ))}
                                 {detectedPlaceholders.length === 0 && <p className="text-sm text-gray-500">No placeholders in template.</p>}
                             </div>
                         </ScrollArea>
                     </CardContent>
                 </Card>
            </div>

            {/* Middle Panel: Editor */}
            <div className="col-span-4 flex flex-col">
                <Card className="flex-grow flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg">Editor</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col p-0">
                        <TooltipProvider delayDuration={100}>
                            <div className="flex items-center gap-1 p-2 border-b">
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => insertFormatting('bold')}><Bold className="h-4 w-4" /></Button></TooltipTrigger>
                                    <TooltipContent><p>Bold</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => insertFormatting('italic')}><Italic className="h-4 w-4" /></Button></TooltipTrigger>
                                    <TooltipContent><p>Italic</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => insertFormatting('heading')}><Heading1 className="h-4 w-4" /></Button></TooltipTrigger>
                                    <TooltipContent><p>Heading</p></TooltipContent>
                                </Tooltip>
                                <Separator orientation="vertical" className="h-6 mx-2" />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                                            <Code className="h-4 w-4"/> Insert Placeholder <ChevronsUpDown className="h-4 w-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {PLACEHOLDERS.map(ph => <DropdownMenuItem key={ph} onClick={() => insertPlaceholder(ph)}>{ph}</DropdownMenuItem>)}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Tooltip>
                                    <TooltipTrigger asChild><Button variant="ghost" size="icon" className="ml-auto" onClick={() => setTemplate(DEFAULT_TEMPLATE)}><RotateCcw className="h-4 w-4"/></Button></TooltipTrigger>
                                    <TooltipContent><p>Reset Template</p></TooltipContent>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                        <div className="flex-grow p-2">
                           <Textarea
                             ref={textareaRef}
                             value={template}
                             onChange={(e) => setTemplate(e.target.value)}
                             className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm"
                             placeholder="Edit your template here..."
                           />
                        </div>
                        <div className="flex gap-2 p-3 border-t">
                            <Button onClick={handleSaveTemplate} className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="h-4 w-4 mr-2" /> Save Template</Button>
                            <Button onClick={handleGeneratePDF} className="bg-green-600 hover:bg-green-700 text-white"><FileDown className="h-4 w-4 mr-2" /> Generate PDF</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel: Preview */}
            <div className="col-span-5">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg">Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[75vh]">
                            <div
                              ref={previewRef}
                              className="p-4 bg-white rounded-md shadow-inner border border-gray-200"
                              dangerouslySetInnerHTML={{ __html: renderPreviewHTML() }}
                            />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}