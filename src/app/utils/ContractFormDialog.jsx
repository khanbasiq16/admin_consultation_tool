// "use client"

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';

// const ContractFormDialog = ({ isOpen, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerPhone: '',
//     customerEmail: '',
//     customerAddress: '',
//     companyName: '',
//     website: '',
//     logoImage: null,
//     watermarkImage: null,
//   });

//   const [templateFields, setTemplateFields] = useState([]); 
//   const [newTemplateFieldName, setNewTemplateFieldName] = useState('');

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleImageChange = (e, fieldName) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
//     }
//   };

//   const handleAddTemplateField = () => {
//     if (newTemplateFieldName.trim()) {
//       const newFieldKey = newTemplateFieldName.trim().replace(/\s+/g, '_').toLowerCase();
//       setTemplateFields((prev) => [...prev, { name: newTemplateFieldName.trim(), key: `[${newFieldKey}]`, value: '' }]);
//       setNewTemplateFieldName('');
//     }
//   };

//   const handleTemplateFieldValueChange = (index, value) => {
//     const updatedFields = [...templateFields];
//     updatedFields[index].value = value;
//     setTemplateFields(updatedFields);
//   };

//   const handleSubmit = () => {
//     onSubmit({ ...formData, templateFields });
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//          <DialogTrigger asChild>
//         <Button className="bg-[#5965AB] text-white">
//           + Create New Template
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[700px] h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Create New Contract Template</DialogTitle>
//           <DialogDescription>
//             Fill in the details for the customer and upload necessary images. You can also add custom template fields.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           {/* Customer Information */}
//           <h3 className="text-lg font-semibold mt-2">Customer Information</h3>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="customerName" className="text-right">
//               Customer Name
//             </Label>
//             <Input id="customerName" value={formData.customerName} onChange={handleChange} className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="customerPhone" className="text-right">
//               Phone
//             </Label>
//             <Input id="customerPhone" value={formData.customerPhone} onChange={handleChange} className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="customerEmail" className="text-right">
//               Email
//             </Label>
//             <Input id="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="customerAddress" className="text-right">
//               Address
//             </Label>
//             <Textarea id="customerAddress" value={formData.customerAddress} onChange={handleChange} className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="companyName" className="text-right">
//               Company Name
//             </Label>
//             <Input id="companyName" value={formData.companyName} onChange={handleChange} className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="website" className="text-right">
//               Website
//             </Label>
//             <Input id="website" type="url" value={formData.website} onChange={handleChange} className="col-span-3" />
//           </div>

//           {/* Image Inputs */}
//           <h3 className="text-lg font-semibold mt-4">Images</h3>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="logoImage" className="text-right">
//               Logo Image
//             </Label>
//             <Input id="logoImage" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'logoImage')} className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="watermarkImage" className="text-right">
//               Watermark Image
//             </Label>
//             <Input id="watermarkImage" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'watermarkImage')} className="col-span-3" />
//           </div>

//           {/* Dynamic Template Fields (Appendix) */}
//           <h3 className="text-lg font-semibold mt-4">Custom Template Fields (Appendix)</h3>
//           {templateFields.map((field, index) => (
//             <div key={index} className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right">
//                 {field.name} ({field.key})
//               </Label>
//               <Input
//                 value={field.value}
//                 onChange={(e) => handleTemplateFieldValueChange(index, e.target.value)}
//                 placeholder={`Value for ${field.name}`}
//                 className="col-span-3"
//               />
//             </div>
//           ))}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="newTemplateFieldName" className="text-right">
//               Add New Field
//             </Label>
//             <Input
//               id="newTemplateFieldName"
//               value={newTemplateFieldName}
//               onChange={(e) => setNewTemplateFieldName(e.target.value)}
//               placeholder="e.g., Service Duration"
//               className="col-span-2"
//             />
//             <Button onClick={handleAddTemplateField} className="col-span-1">
//               Add Field
//             </Button>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit" onClick={handleSubmit}>
//             Save Template
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ContractFormDialog;

// "use client"

// import React, { useState, useRef, useMemo } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import ReactQuill from 'react-quill'; // 1. Import ReactQuill
// // Make sure to have 'react-quill/dist/quill.snow.css' imported in your project's CSS

// // تمام شارٹ کوڈز کی ایک فہرست جو آسانی سے Insert ہو سکیں
// const defaultShortcodes = [
//     { name: 'Customer Name', key: '[customer_name]' },
//     { name: 'Customer Phone', key: '[customer_phone]' },
//     { name: 'Customer Email', key: '[customer_email]' },
//     { name: 'Customer Address', key: '[customer_address]' },
//     { name: 'Company Name', key: '[company_name]' },
//     { name: 'Website URL', key: '[website]' },
//     // Logo اور Watermark کو عموماً Rich Text میں نہیں ڈالا جاتا بلکہ اسے ڈاکومنٹ کے template میں ہینڈل کیا جاتا ہے
// ];

// const ContractFormDialog = ({ isOpen, onClose, onSubmit }) => {
//     // 2. Contract Content کے لیے نیا state
//     const [contractContent, setContractContent] = useState('');
//     const quillRef = useRef(null); // Quill Editor کا حوالہ

//     const [formData, setFormData] = useState({
//         customerName: '',
//         customerPhone: '',
//         customerEmail: '',
//         customerAddress: '',
//         companyName: '',
//         website: '',
//         logoImage: null,
//         watermarkImage: null,
//     });

//     const [templateFields, setTemplateFields] = useState([]); 
//     const [newTemplateFieldName, setNewTemplateFieldName] = useState('');

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleImageChange = (e, fieldName) => {
//         if (e.target.files && e.target.files[0]) {
//             setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
//         }
//     };

//     const handleAddTemplateField = () => {
//         if (newTemplateFieldName.trim()) {
//             const newFieldKey = newTemplateFieldName.trim().replace(/\s+/g, '_').toLowerCase();
//             // Template Fields میں Shortcode key بھی شامل کر رہے ہیں
//             setTemplateFields((prev) => [...prev, { name: newTemplateFieldName.trim(), key: `[${newFieldKey}]`, value: '' }]);
//             setNewTemplateFieldName('');
//         }
//     };

//     const handleTemplateFieldValueChange = (index, value) => {
//         const updatedFields = [...templateFields];
//         updatedFields[index].value = value;
//         setTemplateFields(updatedFields);
//     };

//     // 3. Shortcode Insert کرنے کا فنکشن
//     const insertShortcodeToEditor = (shortcode) => {
//         if (quillRef.current) {
//             const editor = quillRef.current.getEditor();
//             const range = editor.getSelection();
//             const position = range ? range.index : 0;
            
//             // Shortcode کو Text Editor میں Insert کریں
//             editor.insertText(position, shortcode); 
//             // Cursor کو Shortcode کے بعد move کریں
//             editor.setSelection(position + shortcode.length);
//         }
//     };

//     const handleSubmit = () => {
//         // جمع کرائیں جانے والے ڈیٹا میں contractContent شامل کریں
//         onSubmit({ 
//             ...formData, 
//             templateFields,
//             contractContent, // یہ Rich Text Editor سے آنے والا HTML/Delta ہے
//         });
//         onClose();
//     };
    
//     // Rich Text Editor کے لیے modules کی تعریف
//     const modules = useMemo(() => ({
//         toolbar: [
//             [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//             [{size: []}],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{'list': 'ordered'}, {'list': 'bullet'}, 
//             {'indent': '-1'}, {'indent': '+1'}],
//             ['link', 'image', 'video'],
//             ['clean']
//         ],
//         clipboard: {
//             matchVisual: false, // Word/Excel سے کاپی پیسٹ کو بہتر ہینڈل کریں
//         },
//     }), []);

//     // تمام شارٹ کوڈز (بنیادی اور کسٹم) کی مشترکہ فہرست
//     const allShortcodes = [...defaultShortcodes, ...templateFields];

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogTrigger asChild>
//                 <Button className="bg-[#5965AB] text-white">
//                     + Create New Template
//                 </Button>
//             </DialogTrigger>

//             <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle>Create New Contract Template</DialogTitle>
//                     <DialogDescription>
//                         Fill in the details for the customer, upload necessary images, and write the contract content using shortcodes.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-6 py-4">
                    
//                     {/* Contract Content Editor */}
//                     <h3 className="text-lg font-semibold border-b pb-2">Contract Content Editor</h3>
//                     <div className="min-h-[300px]">
//                         <Label htmlFor="contractContent" className="sr-only">
//                             Contract Content
//                         </Label>
//                         {/* 4. Rich Text Editor شامل کریں */}
//                         <ReactQuill 
//                             ref={quillRef}
//                             theme="snow" 
//                             value={contractContent} 
//                             onChange={setContractContent} 
//                             modules={modules}
//                             className="h-[200px]"
//                             placeholder="Write your contract content here and insert shortcodes..."
//                         />
//                     </div>
//                     {/* Add extra padding to account for the fixed height of the editor */}
//                     <div className="pt-10"></div> 

//                     {/* Shortcode Insertion */}
//                     <h3 className="text-lg font-semibold mt-4 border-b pb-2">Insert Shortcodes</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {allShortcodes.map((item) => (
//                             <Button 
//                                 key={item.key} 
//                                 variant="outline" 
//                                 size="sm"
//                                 onClick={() => insertShortcodeToEditor(item.key)}
//                                 className="text-xs"
//                                 title={`Insert ${item.name}`}
//                             >
//                                 {item.key}
//                             </Button>
//                         ))}
//                     </div>

//                     {/* Customer & Company Information (Remains the same) */}
//                     <h3 className="text-lg font-semibold mt-4 border-b pb-2">Customer & Company Information</h3>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="customerName">Customer Name (Shortcode: [customer_name])</Label>
//                             <Input id="customerName" value={formData.customerName} onChange={handleChange} />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="customerPhone">Phone (Shortcode: [customer_phone])</Label>
//                             <Input id="customerPhone" value={formData.customerPhone} onChange={handleChange} />
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="customerEmail">Email (Shortcode: [customer_email])</Label>
//                             <Input id="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="companyName">Company Name (Shortcode: [company_name])</Label>
//                             <Input id="companyName" value={formData.companyName} onChange={handleChange} />
//                         </div>
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="customerAddress">Address (Shortcode: [customer_address])</Label>
//                         <Textarea id="customerAddress" value={formData.customerAddress} onChange={handleChange} />
//                     </div>
                    
//                     <div className="grid gap-2">
//                         <Label htmlFor="website">Website (Shortcode: [website])</Label>
//                         <Input id="website" type="url" value={formData.website} onChange={handleChange} />
//                     </div>
                    
//                     {/* Image Inputs (Remains the same) */}
//                     <h3 className="text-lg font-semibold mt-4 border-b pb-2">Images</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="logoImage">Logo Image</Label>
//                             <Input id="logoImage" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'logoImage')} />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="watermarkImage">Watermark Image</Label>
//                             <Input id="watermarkImage" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'watermarkImage')} />
//                         </div>
//                     </div>
                    
//                     {/* Dynamic Template Fields (Appendix) */}
//                     <h3 className="text-lg font-semibold mt-4 border-b pb-2">Custom Template Fields (Appendix)</h3>
//                     {templateFields.map((field, index) => (
//                         <div key={index} className="grid grid-cols-4 items-center gap-4">
//                             <Label className="text-right">
//                                 {field.name}
//                             </Label>
//                             {/* Shortcode key کو دکھائیں تاکہ یوزر اسے آسانی سے پہچان سکے */}
//                             <p className="col-span-1 text-sm text-gray-500 truncate">{field.key}</p> 
//                             <Input
//                                 value={field.value}
//                                 onChange={(e) => handleTemplateFieldValueChange(index, e.target.value)}
//                                 placeholder={`Value for ${field.name}`}
//                                 className="col-span-2"
//                             />
//                         </div>
//                     ))}
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="newTemplateFieldName" className="text-right">
//                             Add New Field
//                         </Label>
//                         <Input
//                             id="newTemplateFieldName"
//                             value={newTemplateFieldName}
//                             onChange={(e) => setNewTemplateFieldName(e.target.value)}
//                             placeholder="e.g., Service Duration"
//                             className="col-span-2"
//                         />
//                         <Button onClick={handleAddTemplateField} className="col-span-1">
//                             Add Field
//                         </Button>
//                     </div>
//                 </div>
                
//                 <DialogFooter>
//                     <Button type="submit" onClick={handleSubmit}>
//                         Save Template
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ContractFormDialog;

"use client"

import React, { useState, useRef, useEffect, useMemo } from 'react';
// 🛠️ Pure 'quill' لائبریری کو استعمال کریں
import Quill from 'quill'; 

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const defaultShortcodes = [
    { name: 'Customer Name', key: '[customer_name]' },
    { name: 'Customer Phone', key: '[customer_phone]' },
    { name: 'Customer Email', key: '[customer_email]' },
    { name: 'Customer Address', 'key': '[customer_address]' },
    { name: 'Company Name', key: '[company_name]' },
    { name: 'Website URL', key: '[website]' },
];

const ContractFormDialog = () => {
    
    const [contractContent, setContractContent] = useState('');
    const quillContainerRef = useRef(null); 
    const quillInstanceRef = useRef(null); 

    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerAddress: '',
        companyName: '',
        website: '',
        logoImage: null,
        watermarkImage: null,
    });

    const [templateFields, setTemplateFields] = useState([]); 
    const [newTemplateFieldName, setNewTemplateFieldName] = useState('');

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }), []);

   
    useEffect(() => {
        if (quillContainerRef.current && !quillInstanceRef.current) {
            
            const quill = new Quill(quillContainerRef.current, {
                theme: 'snow',
                modules: modules,
                placeholder: "Write your contract content here and insert shortcodes...",
            });
            
            quillInstanceRef.current = quill;

           
            quill.on('text-change', () => {
                
                setContractContent(quill.root.innerHTML);
            });

            // Cleanup function
            return () => {
                quillInstanceRef.current = null;
            };
        }
    }, [modules]); // Dependencies میں modules

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e, fieldName) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, [fieldName]: e.target.files[0] }));
        }
    };

    const handleAddTemplateField = () => {
        if (newTemplateFieldName.trim()) {
            const newFieldKey = newTemplateFieldName.trim().replace(/\s+/g, '_').toLowerCase();
            setTemplateFields((prev) => [...prev, { name: newTemplateFieldName.trim(), key: `[${newFieldKey}]`, value: '' }]);
            setNewTemplateFieldName('');
        }
    };

    const handleTemplateFieldValueChange = (index, value) => {
        const updatedFields = [...templateFields];
        updatedFields[index].value = value;
        setTemplateFields(updatedFields);
    };

    // 4. Shortcode Insert کرنے کا فنکشن (Quill API استعمال کرتے ہوئے)
    const insertShortcodeToEditor = (shortcode) => {
        const quill = quillInstanceRef.current;
        if (quill) {
            const range = quill.getSelection(true);
            const position = range ? range.index : 0;
            
            quill.insertText(position, shortcode); 
            quill.setSelection(position + shortcode.length);
        }
    };

    const handleSubmit = () => {
        onSubmit({ 
            ...formData, 
            templateFields,
            contractContent, 
        });
        onClose();
    };
    
    const allShortcodes = [...defaultShortcodes, ...templateFields];

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button className="bg-[#5965AB] text-white">
                    + Create New Template
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Contract Template</DialogTitle>
                    <DialogDescription>
                        Fill in the details, and write the contract content using the shortcodes provided below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    
                    {/* Shortcode Insertion Buttons */}
                    <h3 className="text-lg font-semibold border-b pb-2">Insert Shortcodes</h3>
                    <div className="flex flex-wrap gap-2">
                        {allShortcodes.map((item) => (
                            <Button 
                                key={item.key} 
                                variant="outline" 
                                size="sm"
                                onClick={() => insertShortcodeToEditor(item.key)}
                                className="text-xs"
                                title={`Insert ${item.name}`}
                            >
                                {item.key}
                            </Button>
                        ))}
                    </div>

                    {/* Contract Content Editor */}
                    <h3 className="text-lg font-semibold border-b pb-2">Contract Content Editor</h3>
                    <div className="min-h-[300px]">
                        {/* 5. وہ div جہاں Quill editor attach ہوگا */}
                        <div ref={quillContainerRef} className="h-[250px] border rounded-md" />
                    </div>
                    
                    <div className="pt-10"></div> 

                    {/* Customer & Company Information */}
                     <h3 className="text-lg font-semibold mt-4 border-b pb-2">Customer & Company Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="customerName">Customer Name (Shortcode: [customer_name])</Label>
                            <Input id="customerName" value={formData.customerName} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="customerPhone">Phone (Shortcode: [customer_phone])</Label>
                            <Input id="customerPhone" value={formData.customerPhone} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="customerEmail">Email (Shortcode: [customer_email])</Label>
                            <Input id="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="companyName">Company Name (Shortcode: [company_name])</Label>
                            <Input id="companyName" value={formData.companyName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="customerAddress">Address (Shortcode: [customer_address])</Label>
                        <Textarea id="customerAddress" value={formData.customerAddress} onChange={handleChange} />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="website">Website (Shortcode: [website])</Label>
                        <Input id="website" type="url" value={formData.website} onChange={handleChange} />
                    </div>
                    
                    {/* Image Inputs */}
                    <h3 className="text-lg font-semibold mt-4 border-b pb-2">Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="logoImage">Logo Image</Label>
                            <Input id="logoImage" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'logoImage')} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="watermarkImage">Watermark Image</Label>
                            <Input id="watermarkImage" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'watermarkImage')} />
                        </div>
                    </div>
                    
                    {/* Dynamic Template Fields (Appendix) */}
                    <h3 className="text-lg font-semibold mt-4 border-b pb-2">Custom Template Fields (Appendix)</h3>
                    {templateFields.map((field, index) => (
                        <div key={index} className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                {field.name}
                            </Label>
                            <p className="col-span-1 text-sm text-gray-500 truncate">{field.key}</p> 
                            <Input
                                value={field.value}
                                onChange={(e) => handleTemplateFieldValueChange(index, e.target.value)}
                                placeholder={`Value for ${field.name}`}
                                className="col-span-2"
                            />
                        </div>
                    ))}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newTemplateFieldName" className="text-right">
                            Add New Field
                        </Label>
                        <Input
                            id="newTemplateFieldName"
                            value={newTemplateFieldName}
                            onChange={(e) => setNewTemplateFieldName(e.target.value)}
                            placeholder="e.g., Service Duration"
                            className="col-span-2"
                        />
                        <Button onClick={handleAddTemplateField} className="col-span-1">
                            Add Field
                        </Button>
                    </div>
                </div>
                
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                        Save Template
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ContractFormDialog;