import type IContactFormData from "@/interfaces/IContactFormData";

export default class ContactFormData implements IContactFormData {
  constructor(
    public name: string = "",
    public phone: string = "",
    public email: string = "",
    public message: string = "",
    public businessName = "",
    public website = "",
  ) {}

  clear() {
    this.name = "";
    this.phone = "";
    this.email = "";
    this.message = "";
    this.businessName = "";
    this.website = "";
  }
}
