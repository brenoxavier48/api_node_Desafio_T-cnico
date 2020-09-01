import { Validator } from '../presentation/protocols'

export class OrganizationValidator implements Validator{
  organizations = [
    'BRZ Empreendimentos',
    'Eleva Educação',
    'ACPL',
    'Shibata'
  ]

  isValid (organizationCod: string): boolean {
    return this.organizations.some( organization => organization === organizationCod )
  }
}