import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecords } from "../context/RecordsContext";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

function MedicalOpinionFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createMedicalOpinion, getMedicalOpinion, updateMedicalOpinion } = useRecords();
    const navigate = useNavigate();
    const params = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        async function loadOpinion() {
            if (params.id) {
                const opinion = await getMedicalOpinion(params.id);
                setValue("codDictamen", opinion.codDictamen);
                setValue("nombrePaciente", opinion.nombrePaciente);
                setValue("docIdentidadPaciente", opinion.docIdentidadPaciente);
                setValue("tipoDocIdentidad", opinion.tipoDocIdentidad);
                setValue("fecha", opinion.fecha);
                setValue("fechaVencimiento", opinion.fechaVencimiento);
                setValue("codigoMedico", opinion.codigoMedico);
                setValue("nombreMedico", opinion.nombreMedico);
                setValue("especialidadesMedico", opinion.especialidadesMedico);
                setValue("criterioMedico", opinion.criterioMedico);
                setValue("diagnosticoMedico", opinion.diagnosticoMedico);
                setValue("recomendacionReposo", opinion.recomendacionReposo);
            }
        }
        loadOpinion();
    }, [params.id, setValue, getMedicalOpinion]);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateMedicalOpinion(params.id, data);
        } else {
            generatePDF(data);
            //createMedicalOpinion(data);
        }
        generatePDF(data);
        navigate("/opinions");
    });

    const generatePDF = (data) => {
        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text(`Cod Dictamen: ${data.codDictamen}`, 10, 10);
        doc.text(`Nombre Paciente: ${data.nombrePaciente}`, 10, 20);
        doc.text(`Documento de identidad Paciente: ${data.docIdentidadPaciente}`, 10, 30);
        doc.text(`Tipo de Documento de identidad: ${data.tipoDocIdentidad}`, 10, 40);
        doc.text(`Fecha: ${data.fecha}`, 10, 50);
        doc.text(`Fecha vencimiento: ${data.fechaVencimiento}`, 10, 60);
        doc.text(`Código Médico: ${data.codigoMedico}`, 10, 70);
        doc.text(`Nombre Médico: ${data.nombreMedico}`, 10, 80);
        doc.text(`Especialidades Médico: ${data.especialidadesMedico}`, 10, 90);
        doc.text("Criterio Médico sobre el Examinado", 10, 100);
        doc.text(data.criterioMedico, 10, 110, { maxWidth: 180 });
        doc.text(`Diagnóstico Médico: ${data.diagnosticoMedico}`, 10, 150);
        doc.text(`Recomendación de Reposo: ${data.recomendacionReposo} días`, 10, 160);
        doc.text(
            "La presente certificación, cuyos derechos arancelarios fueron debidamente cancelados, constituye documento público conforme lo establecen los artículos 4 y 5 inciso d) de la Ley de Certificados, Firmas Digitales y Documentos Electrónicos, publicada en La Gaceta N°197 del 13 de octubre de 2005 y sus reformas; así como los acuerdos de Junta de Gobierno del Colegio de Médicos y Cirujanos de Costa Rica. En dicho marco legal se establece la obligatoriedad de recibir este documento por parte de los entes públicos y privados, así como para los particulares. En caso de que se le presenten problemas para la recepción de este documento y aplicación de sus efectos legales, sírvase comunicarlos al teléfono 2210-2263. Esta certificación únicamente podrá ser verificada a través del sitio web www.medicos.cr, dentro de los siguientes tres meses naturales. Si la certificación contiene alguna inconsistencia, favor contar al correo electrónico fiscaladjunto@medicos.cr, para determinar la inconsistencia y la competencia de la resolución.",
            10,
            170,
            { maxWidth: 180 }
        );
        doc.save("medical_opinion.pdf");
    };

    return (
        <div className="flex h-auto items-center justify-center">
            <div className="bg-gray-dark max-w-md w-full p-10 rounded-md">
                <form onSubmit={onSubmit}>
                    <label htmlFor="codDictamen" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.codDictamen")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.codDictamenPlaceholder")}
                        {...register("codDictamen", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                        autoFocus
                    />
                    {errors.codDictamen && (<p className="text-red mb-2">{t("medicalOpinionFormPage.codDictamenRequired")}</p>)}

                    <label htmlFor="nombrePaciente" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.nombrePaciente")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.nombrePacientePlaceholder")}
                        {...register("nombrePaciente", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.nombrePaciente && (<p className="text-red mb-2">{t("medicalOpinionFormPage.nombrePacienteRequired")}</p>)}

                    <label htmlFor="docIdentidadPaciente" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.docIdentidadPaciente")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.docIdentidadPacientePlaceholder")}
                        {...register("docIdentidadPaciente", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.docIdentidadPaciente && (<p className="text-red mb-2">{t("medicalOpinionFormPage.docIdentidadPacienteRequired")}</p>)}

                    <label htmlFor="tipoDocIdentidad" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.tipoDocIdentidad")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.tipoDocIdentidadPlaceholder")}
                        {...register("tipoDocIdentidad", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.tipoDocIdentidad && (<p className="text-red mb-2">{t("medicalOpinionFormPage.tipoDocIdentidadRequired")}</p>)}

                    <label htmlFor="fecha" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.fecha")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.fechaPlaceholder")}
                        {...register("fecha", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.fecha && (<p className="text-red mb-2">{t("medicalOpinionFormPage.fechaRequired")}</p>)}

                    <label htmlFor="fechaVencimiento" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.fechaVencimiento")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.fechaVencimientoPlaceholder")}
                        {...register("fechaVencimiento", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.fechaVencimiento && (<p className="text-red mb-2">{t("medicalOpinionFormPage.fechaVencimientoRequired")}</p>)}

                    <label htmlFor="codigoMedico" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.codigoMedico")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.codigoMedicoPlaceholder")}
                        {...register("codigoMedico", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.codigoMedico && (<p className="text-red mb-2">{t("medicalOpinionFormPage.codigoMedicoRequired")}</p>)}

                    <label htmlFor="nombreMedico" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.nombreMedico")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.nombreMedicoPlaceholder")}
                        {...register("nombreMedico", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.nombreMedico && (<p className="text-red mb-2">{t("medicalOpinionFormPage.nombreMedicoRequired")}</p>)}

                    <label htmlFor="especialidadesMedico" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.especialidadesMedico")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.especialidadesMedicoPlaceholder")}
                        {...register("especialidadesMedico", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.especialidadesMedico && (<p className="text-red mb-2">{t("medicalOpinionFormPage.especialidadesMedicoRequired")}</p>)}

                    <label htmlFor="criterioMedico" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.criterioMedico")}</label>
                    <textarea
                        rows="3"
                        placeholder={t("medicalOpinionFormPage.criterioMedicoPlaceholder")}
                        {...register("criterioMedico", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    ></textarea>
                    {errors.criterioMedico && (<p className="text-red mb-2">{t("medicalOpinionFormPage.criterioMedicoRequired")}</p>)}

                    <label htmlFor="diagnosticoMedico" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.diagnosticoMedico")}</label>
                    <input
                        type="text"
                        placeholder={t("medicalOpinionFormPage.diagnosticoMedicoPlaceholder")}
                        {...register("diagnosticoMedico", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.diagnosticoMedico && (<p className="text-red mb-2">{t("medicalOpinionFormPage.diagnosticoMedicoRequired")}</p>)}

                    <label htmlFor="recomendacionReposo" className="block text-white text-sm font-bold mb-2">{t("medicalOpinionFormPage.recomendacionReposo")}</label>
                    <input
                        type="number"
                        placeholder={t("medicalOpinionFormPage.recomendacionReposoPlaceholder")}
                        {...register("recomendacionReposo", { required: true })}
                        className="w-full bg-white text-gray-dark px-4 py-2 rounded-md mb-2"
                    />
                    {errors.recomendacionReposo && (<p className="text-red mb-2">{t("medicalOpinionFormPage.recomendacionReposoRequired")}</p>)}

                    <button className="bg-blue text-white px-4 py-2 rounded-md w-full mt-4">{t("medicalOpinionFormPage.generarPDFyGuardar")}</button>
                </form>
            </div>
        </div>
    );
}

export default MedicalOpinionFormPage;
