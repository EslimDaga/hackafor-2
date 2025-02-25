import { HTMLAttributes } from 'react';
import { cn, Project } from '@common';
import { Button, CardWrapper, Tag } from '@components';

interface ProjectCardProps extends Omit<Project, 'id' | 'createdAt' | 'repositoryUrl'>, HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

export const ProjectCard = ({ className, name, description, administrator, members, requiredRoles, ...restOfProps }: ProjectCardProps) => {
  const classes = {
    container: cn('grid gap-8 max-w-md w-full max-xl:mx-auto', className),
    subTitle: cn('text-4 font-bold'),
    list: cn('flex flex-wrap gap-4 mt-4 text-3.5')
  };
  const handleDescription = () => {
    if (description.length > 175) return `${description.slice(0, 130)}...`;
    return description;
  };
  const renderParticipantsTag = () => {
    return members.map((member) => {
      if (member.role === undefined) return null;
      return (
        <li key={member.name}>
          <Tag className="capitalize">{member.role}</Tag>
        </li>
      );
    });
  };

  /* TODO: Filtrar si está buscando antes del texto */
  const renderRequiredRolesTag = () => {
    return Object.entries(requiredRoles)
      .filter(([, quantity]) => quantity > 0)
      .map(([role]) => (
        <li key={role}>
          <Tag className="capitalize">{role}</Tag>
        </li>
      ));
  };

  return (
    <CardWrapper {...restOfProps} className={classes.container}>
      {/*  Header */}
      <header className="grid gap-4">
        <h3 className="font-bold text-8">{name}</h3>
        <p className="text-4 h-24 text-balance truncate">{handleDescription()}</p>
      </header>

      {/* Participants Section */}
      <section aria-labelledby="participants-title">
        <h4 id="participants-title" className={classes.subTitle}>
          Participantes
        </h4>
        <ul className={classes.list}>
          <li>
            <Tag className="capitalize">{administrator.role}</Tag>
          </li>
          {renderParticipantsTag()}
        </ul>
      </section>

      {/* Roles Section */}
      <section aria-labelledby="roles-title">
        <h4 id="roles-title" className={classes.subTitle}>
          Estamos buscando
        </h4>
        <ul className={classes.list}>{renderRequiredRolesTag()}</ul>
      </section>

      <footer className="mx-auto">
        <Button>Contactar</Button>
      </footer>
    </CardWrapper>
  );
};
